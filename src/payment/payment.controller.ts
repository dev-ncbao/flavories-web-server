'use strict';

import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    ParseIntPipe,
    Query,
    Request,
    UseGuards
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
    CreatePaymentLinkDto,
    PaymentLinkResponseDto,
    PaymentInfoResponseDto,
    CancelPaymentResponseDto,
    CancelPaymentLinkDto,
    WebhookDataDto,
    CreateCoursePaymentDto,
    CoursePaymentResponseDto,
    CheckPaymentStatusDto,
    PaymentStatusResponseDto
} from './payment.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../common/types/authenticated-user';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('payment-link')
    @ApiOperation({
        summary: 'Tạo link thanh toán',
        description:
            'Tạo link thanh toán với QR code. returnUrl và cancelUrl sẽ tự động được tạo nếu không được cung cấp.'
    })
    @ApiResponse({
        status: 200,
        description: 'Tạo link thanh toán thành công. Response chứa qrCode để hiển thị QR code.',
        type: PaymentLinkResponseDto
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async createPaymentLink(
        @Body() dto: CreatePaymentLinkDto
    ): Promise<PaymentLinkResponseDto> {
        return this.paymentService.createPaymentLink(dto);
    }

    @Get('payment-info/:orderCode')
    @ApiOperation({ summary: 'Lấy thông tin thanh toán' })
    @ApiResponse({
        status: 200,
        description: 'Lấy thông tin thanh toán thành công',
        type: PaymentInfoResponseDto
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async getPaymentInfo(
        @Param('orderCode', ParseIntPipe) orderCode: number
    ): Promise<PaymentInfoResponseDto> {
        return this.paymentService.getPaymentInfo(orderCode);
    }

    @Post('cancel-payment')
    @ApiOperation({ summary: 'Hủy link thanh toán' })
    @ApiResponse({
        status: 200,
        description: 'Hủy link thanh toán thành công',
        type: CancelPaymentResponseDto
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async cancelPaymentLink(
        @Body() dto: CancelPaymentLinkDto
    ): Promise<CancelPaymentResponseDto> {
        return this.paymentService.cancelPaymentLink(dto.orderCode);
    }

    @Post('course')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('accessToken')
    @ApiOperation({
        summary: 'Tạo link thanh toán cho khóa học',
        description:
            'Tạo link thanh toán cho khóa học dựa trên courseId. UserId được lấy từ JWT token.'
    })
    @ApiResponse({
        status: 200,
        description:
            'Tạo link thanh toán thành công. Trả về checkoutUrl để redirect người dùng đến trang thanh toán.',
        type: CoursePaymentResponseDto
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Course not found' })
    async createCoursePayment(
        @Body() dto: CreateCoursePaymentDto,
        @Request() req: AuthenticatedRequest
    ): Promise<CoursePaymentResponseDto> {
        return await this.paymentService.createCoursePaymentLink(
            dto.courseId,
            req.user.userId
        );
    }

    @Get('check-status')
    @ApiOperation({
        summary: 'Kiểm tra trạng thái thanh toán',
        description:
            'Kiểm tra trạng thái thanh toán dựa trên courseId và orderCode'
    })
    @ApiResponse({
        status: 200,
        description: 'Kiểm tra trạng thái thanh toán thành công',
        type: PaymentStatusResponseDto
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async checkPaymentStatus(
        @Query('courseId', ParseIntPipe) courseId: number,
        @Query('orderCode', ParseIntPipe) orderCode: number
    ): Promise<PaymentStatusResponseDto> {
        return await this.paymentService.checkPaymentStatus(
            courseId,
            orderCode
        );
    }

    @Post('webhook')
    @ApiOperation({ summary: 'Webhook nhận thông tin thanh toán từ payOS' })
    @ApiResponse({
        status: 200,
        description: 'Webhook processed successfully'
    })
    @ApiResponse({ status: 400, description: 'Invalid signature' })
    async handleWebhook(@Body() webhookData: WebhookDataDto): Promise<{
        code: string;
        desc: string;
    }> {
        await this.paymentService.handleWebhook(webhookData);
        return {
            code: '00',
            desc: 'success'
        };
    }
}

