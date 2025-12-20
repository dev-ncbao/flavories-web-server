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
    CancelPaymentResponseDto,
    WebhookDataDto,
    CreateCoursePaymentDto,
    CoursePaymentResponseDto,
    CheckPaymentStatusDto,
    PaymentStatusResponseDto,
    CoursePurchaseStatusResponseDto
} from './payment.dto';
import { Course } from '../courses/courses.model';
import { Payment } from './payment.model';
import { UserService } from '../users/user.service';
import { PaymentStatus } from '../common/types/types';
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
     * Verify webhook signature
     */
    verifyWebhookSignature(webhookData: WebhookDataDto): boolean {
        const { signature, data } = webhookData;
        const calculatedSignature = this.generateSignature(data);
        return calculatedSignature === signature;
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
                const errorData = await response.json().catch(() => ({}));
                throw new BadRequestException(
                    errorData.desc || `PayOS API error: ${response.statusText}`
                );
            }

            return await response.json();
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException(
                `Failed to create payment link: ${error.message}`
            );
        }
    }

    /**
     * Get payment information by order code
     */
    async getPaymentInfo(
        orderCode: number
    ): Promise<PaymentInfoResponseDto> {
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
                const errorData = await response.json().catch(() => ({}));
                throw new BadRequestException(
                    errorData.desc || `PayOS API error: ${response.statusText}`
                );
            }

            return await response.json();
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException(
                `Failed to get payment info: ${error.message}`
            );
        }
    }

    /**
     * Cancel payment link
     */
    async cancelPaymentLink(
        orderCode: number
    ): Promise<CancelPaymentResponseDto> {
        try {
            const response = await fetch(
                `${this.apiUrl}/v2/payment-requests/${orderCode}/cancel`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-client-id': this.clientId,
                        'x-api-key': this.apiKey
                    }
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new BadRequestException(
                    errorData.desc || `PayOS API error: ${response.statusText}`
                );
            }

            return await response.json();
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException(
                `Failed to cancel payment link: ${error.message}`
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
        if (!course.dataValues.price || course.dataValues.price <= 0) {
            throw new BadRequestException(
                'Course does not have a valid price'
            );
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
        const description = `PAYMENT - Order Number ${course.dataValues.courseId}`;

        // Create payment link DTO
        const coursePrice = Math.round(course.dataValues.price);
        const paymentDto: CreatePaymentLinkDto = {
            orderCode,
            amount: coursePrice,
            description,
            buyerName: `${user.dataValues.firstName} ${user.dataValues.lastName}`,
            buyerEmail: user.dataValues.email,
            items: [
                {
                    name: course.dataValues.name,
                    quantity: 1,
                    price: coursePrice
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
            : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days from now

        // Create payment record in database
        await this.paymentModel.create({
            courseId: courseId,
            userId: userId,
            amount: coursePrice,
            orderCode: orderCode,
            paymentLinkId: paymentLinkResponse.data.paymentLinkId,
            expiredAt: expiredAt,
            status: PaymentStatus.PENDING
        });

        // Return only checkoutUrl
        // payOS response includes checkoutUrl in the data object
        const checkoutUrl = (paymentLinkResponse.data as any).checkoutUrl;
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
        let payOSStatus: string = payment.dataValues.status; // Default to current status
        try {
            const paymentInfo = await this.getPaymentInfo(orderCode);
            
            // Map payOS status to our PaymentStatus enum
            // payOS status values: PENDING, PAID, CANCELLED, EXPIRED
            const payOSStatusValue = paymentInfo.data.status;
            if (payOSStatusValue === 'PAID') {
                payOSStatus = PaymentStatus.PAID;
            } else if (payOSStatusValue === 'CANCELLED') {
                payOSStatus = PaymentStatus.CANCELLED;
            } else if (payOSStatusValue === 'EXPIRED') {
                payOSStatus = PaymentStatus.EXPIRED;
            } else {
                payOSStatus = PaymentStatus.PENDING;
            }
            
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
            payOSStatus = payment.dataValues.status;
        }

        const isSuccess = payOSStatus === 'PAID';

        // Reload payment to get updated values
        await payment.reload();

        return {
            isSuccess: isSuccess,
            status: payOSStatus,
            payment: {
                paymentId: payment.dataValues.paymentId,
                courseId: payment.dataValues.courseId,
                userId: payment.dataValues.userId,
                amount: payment.dataValues.amount,
                orderCode: payment.dataValues.orderCode,
                status: payOSStatus,
                createdAt: payment.dataValues.createdAt,
                updatedAt: payment.dataValues.updatedAt
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
                paymentId: payment.dataValues.paymentId,
                courseId: payment.dataValues.courseId,
                userId: payment.dataValues.userId,
                amount: payment.dataValues.amount,
                orderCode: payment.dataValues.orderCode,
                status: payment.dataValues.status,
                createdAt: payment.dataValues.createdAt,
                updatedAt: payment.dataValues.updatedAt
            }
        };
    }

    /**
     * Handle webhook from payOS
     */
    async handleWebhook(webhookData: WebhookDataDto): Promise<void> {
        // Verify signature
        if (!this.verifyWebhookSignature(webhookData)) {
            throw new BadRequestException('Invalid webhook signature');
        }

        // Process webhook data
        const { data } = webhookData;

        // TODO: Implement your business logic here
        // For example: update order status in database, send notification, etc.
        console.log('Payment webhook received:', {
            orderCode: data.orderCode,
            amount: data.amount,
            status: data.code,
            description: data.desc
        });
    }
}

