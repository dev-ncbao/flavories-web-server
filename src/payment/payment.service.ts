/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use strict';

import {
    Injectable,
    BadRequestException,
    NotFoundException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import {
    CreatePaymentLinkDto,
    PaymentLinkResponseDto,
    PaymentInfoResponseDto,
    CoursePaymentResponseDto,
    PaymentStatusResponseDto,
    CoursePurchaseStatusResponseDto
} from './payment.dto';
import { Course } from '../courses/courses.model';
import { Payment } from './payment.model';
import { UserService } from '../users/user.service';
import { PaymentStatus } from '../common/types/types';
import { APP_CONSTANTS } from 'src/common/constants/app.constants';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
    private readonly apiUrl: string;
    private readonly clientId: string;
    private readonly apiKey: string;
    private readonly checksumKey: string;
    private readonly frontendUrl: string;

    constructor(
        private readonly configService: ConfigService,
        @InjectModel(Course)
        private readonly courseModel: typeof Course,
        @InjectModel(Payment)
        private readonly paymentModel: typeof Payment,
        private readonly userService: UserService
    ) {
        this.apiUrl =
            this.configService.get<string>('PAYOS_API_URL') ||
            'https://api-merchant.payos.vn';
        this.clientId = this.configService.get<string>('PAYOS_CLIENT_ID') || '';
        this.apiKey = this.configService.get<string>('PAYOS_API_KEY') || '';
        this.checksumKey =
            this.configService.get<string>('PAYOS_CHECKSUM_KEY') || '';
        this.frontendUrl =
            this.configService.get<string>('FRONTEND_URL') ||
            'http://localhost:5555';

        if (!this.clientId || !this.apiKey || !this.checksumKey) {
            console.warn(
                'PayOS credentials not configured. Payment features will not work.'
            );
        }
    }

    /**
     * Generate HMAC SHA256 signature for payOS requests
     */
    private generateSignature(data: Record<string, any>): string {
        // Sort keys alphabetically and create query string
        const sortedKeys = Object.keys(data).sort();
        const queryString = sortedKeys
            .map((key) => `${key}=${data[key]}`)
            .join('&');

        // Generate HMAC SHA256 signature
        return crypto
            .createHmac('sha256', this.checksumKey)
            .update(queryString)
            .digest('hex');
    }

    /**
     * Create payment link
     */
    async createPaymentLink(
        dto: CreatePaymentLinkDto
    ): Promise<PaymentLinkResponseDto> {
        // Auto-generate returnUrl and cancelUrl if not provided
        const returnUrl =
            dto.returnUrl ||
            `${this.frontendUrl}/payment/success?orderCode=${dto.orderCode}`;
        const cancelUrl =
            dto.cancelUrl ||
            `${this.frontendUrl}/payment/cancel?orderCode=${dto.orderCode}`;

        const signature = this.generateSignature({
            amount: dto.amount,
            cancelUrl: cancelUrl,
            description: dto.description,
            orderCode: dto.orderCode,
            returnUrl: returnUrl
        });

        const requestBody = {
            ...dto,
            returnUrl,
            cancelUrl,
            signature
        };

        try {
            const response = await fetch(`${this.apiUrl}/v2/payment-requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-client-id': this.clientId,
                    'x-api-key': this.apiKey
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = (await response.json().catch(() => ({}))) as {
                    desc?: string;
                };
                throw new BadRequestException(
                    errorData.desc || `PayOS API error: ${response.statusText}`
                );
            }

            return (await response.json()) as PaymentLinkResponseDto;
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            const errorMessage =
                error instanceof Error ? error.message : 'Unknown error';
            throw new BadRequestException(
                `Failed to create payment link: ${errorMessage}`
            );
        }
    }

    /**
     * Get payment information by order code
     */
    async getPaymentInfo(orderCode: number): Promise<PaymentInfoResponseDto> {
        try {
            const response = await fetch(
                `${this.apiUrl}/v2/payment-requests/${orderCode}`,
                {
                    method: 'GET',
                    headers: {
                        'x-client-id': this.clientId,
                        'x-api-key': this.apiKey
                    }
                }
            );

            if (!response.ok) {
                const errorData = (await response.json().catch(() => ({}))) as {
                    desc?: string;
                };
                throw new BadRequestException(
                    errorData.desc || `PayOS API error: ${response.statusText}`
                );
            }

            return (await response.json()) as PaymentInfoResponseDto;
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            const errorMessage =
                error instanceof Error ? error.message : 'Unknown error';
            throw new BadRequestException(
                `Failed to get payment info: ${errorMessage}`
            );
        }
    }

    /**
     * Create payment link for a course
     */
    async createCoursePaymentLink(
        courseId: number,
        userId: number
    ): Promise<CoursePaymentResponseDto> {
        // Get course information
        const course = await this.courseModel.findByPk(courseId);
        if (!course) {
            throw new NotFoundException('Course not found');
        }

        // Check if course has a price
        const coursePrice = course.getDataValue('price') as number | null;
        if (!coursePrice || coursePrice <= 0) {
            throw new BadRequestException('Course does not have a valid price');
        }

        // Get user information
        const user = await this.userService.findOneById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Generate unique order code: courseId + userId + timestamp
        // Using timestamp to ensure uniqueness
        const timestamp = Date.now();
        const orderCode = parseInt(
            `${courseId}${userId}${timestamp.toString().slice(-6)}`
        );

        // Create payment description
        const courseIdValue = course.getDataValue('courseId');
        const description = `PAYMENT - Order Number ${courseIdValue}`;

        // Create payment link DTO
        const roundedPrice = Math.round(coursePrice);
        const userFirstName = user.getDataValue('firstName');
        const userLastName = user.getDataValue('lastName');
        const userEmail = user.getDataValue('email');
        const courseName = course.getDataValue('name');

        const paymentDto: CreatePaymentLinkDto = {
            orderCode,
            amount: roundedPrice,
            description,
            buyerName: `${userFirstName} ${userLastName}`,
            buyerEmail: userEmail,
            items: [
                {
                    name: courseName,
                    quantity: 1,
                    price: roundedPrice
                }
            ],
            returnUrl: `${this.frontendUrl}/payment/success?orderCode=${orderCode}&courseId=${courseId}`,
            cancelUrl: `${this.frontendUrl}/payment/cancel?orderCode=${orderCode}&courseId=${courseId}`
        };

        // Create payment link with payOS
        const paymentLinkResponse = await this.createPaymentLink(paymentDto);

        // Calculate expiredAt (default: 2 days from now, or use expiredAt from DTO if provided)
        const expiredAt = paymentDto.expiredAt
            ? new Date(paymentDto.expiredAt * 1000)
            : new Date(
                  Date.now() +
                      APP_CONSTANTS.PAYMENT_EXPIRY_DAYS *
                          APP_CONSTANTS.MILLISECONDS_PER_DAY
              );

        // Create payment record in database
        await this.paymentModel.create({
            courseId: courseId,
            userId: userId,
            amount: roundedPrice,
            orderCode: orderCode,
            paymentLinkId: paymentLinkResponse.data.paymentLinkId,
            expiredAt: expiredAt,
            status: PaymentStatus.PENDING
        });

        // Return only checkoutUrl
        // payOS response includes checkoutUrl in the data object
        const paymentData = paymentLinkResponse.data as {
            checkoutUrl?: string;
        };
        const checkoutUrl = paymentData.checkoutUrl;
        if (!checkoutUrl) {
            throw new BadRequestException(
                'Payment link response missing checkoutUrl'
            );
        }
        return {
            checkoutUrl: checkoutUrl
        };
    }

    /**
     * Check payment status by courseId and orderCode
     * Fetches latest status from payOS and updates database
     */
    async checkPaymentStatus(
        courseId: number,
        orderCode: number
    ): Promise<PaymentStatusResponseDto> {
        // Find payment record
        const payment = await this.paymentModel.findOne({
            where: {
                courseId: courseId,
                orderCode: orderCode
            }
        });

        if (!payment) {
            return {
                isSuccess: false,
                status: 'NOT_FOUND'
            };
        }

        // Call payOS API to get latest payment status using orderCode
        let payOSStatus: string = payment.getDataValue('status'); // Default to current status
        try {
            const paymentInfo = await this.getPaymentInfo(orderCode);
            payOSStatus = this.mapPayOSStatusToPaymentStatus(
                paymentInfo.data.status
            );

            // Update payment record in database with latest status
            await payment.update({
                status: payOSStatus
            });
        } catch (error) {
            // If payOS API call fails, use current database status
            console.warn(
                `Failed to fetch payment status from payOS for orderCode ${orderCode}:`,
                error
            );
            payOSStatus = payment.getDataValue('status');
        }

        const isSuccess = payOSStatus === String(PaymentStatus.PAID);

        // Reload payment to get updated values
        await payment.reload();

        return {
            isSuccess: isSuccess,
            status: payOSStatus,
            payment: {
                paymentId: payment.getDataValue('paymentId'),
                courseId: payment.getDataValue('courseId'),
                userId: payment.getDataValue('userId'),
                amount: payment.getDataValue('amount'),
                orderCode: payment.getDataValue('orderCode'),
                status: payOSStatus,
                createdAt: payment.getDataValue('createdAt'),
                updatedAt: payment.getDataValue('updatedAt')
            }
        };
    }

    /**
     * Check if user has purchased a course
     */
    async checkCoursePurchase(
        courseId: number,
        userId: number
    ): Promise<CoursePurchaseStatusResponseDto> {
        // Find payment record with PAID status for this course and user
        const payment = await this.paymentModel.findOne({
            where: {
                courseId: courseId,
                userId: userId,
                status: PaymentStatus.PAID
            },
            order: [['createdAt', 'DESC']] // Get the most recent purchase
        });

        if (!payment) {
            return {
                hasPurchased: false
            };
        }

        return {
            hasPurchased: true,
            payment: {
                paymentId: payment.getDataValue('paymentId'),
                courseId: payment.getDataValue('courseId'),
                userId: payment.getDataValue('userId'),
                amount: payment.getDataValue('amount'),
                orderCode: payment.getDataValue('orderCode'),
                status: payment.getDataValue('status'),
                createdAt: payment.getDataValue('createdAt'),
                updatedAt: payment.getDataValue('updatedAt')
            }
        };
    }

    /**
     * Map PayOS status to internal PaymentStatus enum
     */
    private mapPayOSStatusToPaymentStatus(payOSStatus: string): string {
        // Map payOS status to our PaymentStatus enum
        // PayOS status values: PENDING, PAID, CANCELLED, EXPIRED, PROCESSING, etc.
        switch (payOSStatus) {
            case 'PAID':
                return PaymentStatus.PAID;
            case 'CANCELLED':
                return PaymentStatus.CANCELLED;
            case 'EXPIRED':
                return PaymentStatus.EXPIRED;
            case 'PROCESSING':
                return PaymentStatus.PROCESSING;
            case 'UNDERPAID':
                return PaymentStatus.UNDERPAID;
            case 'FAILED':
                return PaymentStatus.FAILED;
            default:
                return PaymentStatus.PENDING;
        }
    }
}
