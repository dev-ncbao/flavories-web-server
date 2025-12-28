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
    CreateCoursePaymentDto,
    CoursePaymentResponseDto,
    PaymentStatusResponseDto,
    CoursePurchaseStatusResponseDto
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
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('accessToken')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('course')
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
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async checkPaymentStatus(
        @Query('courseId', ParseIntPipe) courseId: number,
        @Query('orderCode', ParseIntPipe) orderCode: number
    ): Promise<PaymentStatusResponseDto> {
        return await this.paymentService.checkPaymentStatus(
            courseId,
            orderCode
        );
    }

    @Get('course/:courseId/purchase-status')
    @ApiOperation({
        summary: 'Kiểm tra người dùng đã mua khóa học chưa',
        description:
            'Kiểm tra xem người dùng đã mua khóa học này chưa. UserId được lấy từ JWT token.'
    })
    @ApiResponse({
        status: 200,
        description: 'Kiểm tra trạng thái mua khóa học thành công',
        type: CoursePurchaseStatusResponseDto
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async checkCoursePurchase(
        @Param('courseId', ParseIntPipe) courseId: number,
        @Request() req: AuthenticatedRequest
    ): Promise<CoursePurchaseStatusResponseDto> {
        return await this.paymentService.checkCoursePurchase(
            courseId,
            req.user.userId
        );
    }
}
