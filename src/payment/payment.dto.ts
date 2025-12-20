'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class PaymentItemDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    price: number;
}

export class CreatePaymentLinkDto {
    @ApiProperty({ description: 'Mã đơn hàng (order code)' })
    orderCode: number;

    @ApiProperty({ description: 'Số tiền thanh toán (VND)' })
    amount: number;

    @ApiProperty({ description: 'Mô tả thanh toán' })
    description: string;

    @ApiProperty({ required: false, description: 'Tên người mua hàng' })
    buyerName?: string;

    @ApiProperty({ required: false, description: 'Tên đơn vị mua hàng' })
    buyerCompanyName?: string;

    @ApiProperty({ required: false, description: 'Mã số thuế' })
    buyerTaxCode?: string;

    @ApiProperty({ required: false, description: 'Địa chỉ người mua' })
    buyerAddress?: string;

    @ApiProperty({ required: false, description: 'Email người mua' })
    buyerEmail?: string;

    @ApiProperty({ required: false, description: 'Số điện thoại người mua' })
    buyerPhone?: string;

    @ApiProperty({
        required: false,
        type: [PaymentItemDto],
        description: 'Danh sách sản phẩm'
    })
    items?: PaymentItemDto[];

    @ApiProperty({
        required: false,
        description: 'URL nhận dữ liệu khi hủy đơn hàng (mặc định sẽ redirect về frontend)'
    })
    cancelUrl?: string;

    @ApiProperty({
        required: false,
        description: 'URL nhận dữ liệu khi thanh toán thành công (mặc định sẽ redirect về frontend)'
    })
    returnUrl?: string;

    @ApiProperty({
        required: false,
        description: 'Thời gian hết hạn (Unix timestamp)'
    })
    expiredAt?: number;
}

export class PaymentLinkResponseDto {
    @ApiProperty({ description: 'Mã phản hồi từ payOS' })
    code: string;

    @ApiProperty({ description: 'Mô tả phản hồi' })
    desc: string;

    @ApiProperty({
        description: 'Dữ liệu link thanh toán',
        example: {
            bin: '970422',
            accountNumber: '123456789',
            accountName: 'CONG TY ABC',
            amount: 100000,
            description: 'Thanh toan',
            orderCode: 123456,
            currency: 'VND',
            paymentLinkId: 'payment_link_id',
            qrCode: 'https://img.vietqr.io/image/...',
            checkoutUrl: 'https://pay.payos.vn/web/...'
        }
    })
    data: {
        bin: string;
        accountNumber: string;
        accountName: string;
        amount: number;
        description: string;
        orderCode: number;
        currency: string;
        paymentLinkId: string;
        qrCode: string;
        checkoutUrl: string;
    };
}

export class GetPaymentInfoDto {
    @ApiProperty({ description: 'Mã đơn hàng (order code)' })
    orderCode: number;
}

export class PaymentInfoResponseDto {
    @ApiProperty()
    code: string;

    @ApiProperty()
    desc: string;

    @ApiProperty()
    data: {
        orderCode: number;
        amount: number;
        amountPaid: number;
        amountRemaining: number;
        status: string;
        createdAt: string;
        transactions: Array<{
            reference: string;
            amount: number;
            accountNumber: string;
            description: string;
            transactionDateTime: string;
        }>;
    };
}

export class CancelPaymentLinkDto {
    @ApiProperty({ description: 'Mã đơn hàng (order code)' })
    orderCode: number;
}

export class CancelPaymentResponseDto {
    @ApiProperty()
    code: string;

    @ApiProperty()
    desc: string;
}

export class CreateCoursePaymentDto {
    @ApiProperty({ description: 'ID của khóa học cần thanh toán' })
    courseId: number;
}

export class CoursePaymentResponseDto {
    @ApiProperty({
        description: 'URL thanh toán để redirect người dùng đến trang thanh toán payOS'
    })
    checkoutUrl: string;
}

export class CheckPaymentStatusDto {
    @ApiProperty({ description: 'ID của khóa học' })
    courseId: number;

    @ApiProperty({ description: 'Mã đơn hàng (order code)' })
    orderCode: number;
}

export class PaymentStatusResponseDto {
    @ApiProperty({ description: 'Trạng thái thanh toán có thành công hay không' })
    isSuccess: boolean;

    @ApiProperty({
        description: 'Trạng thái thanh toán',
        enum: ['PENDING', 'PAID', 'CANCELLED', 'FAILED']
    })
    status: string;

    @ApiProperty({
        required: false,
        description: 'Thông tin thanh toán (nếu có)'
    })
    payment?: {
        paymentId: number;
        courseId: number;
        userId: number;
        amount: number;
        orderCode: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    };
}

export class CoursePurchaseStatusResponseDto {
    @ApiProperty({ description: 'Người dùng đã mua khóa học này hay chưa' })
    hasPurchased: boolean;

    @ApiProperty({
        required: false,
        description: 'Thông tin thanh toán (nếu đã mua)'
    })
    payment?: {
        paymentId: number;
        courseId: number;
        userId: number;
        amount: number;
        orderCode: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    };
}

export class WebhookDataDto {
    @ApiProperty()
    code: string;

    @ApiProperty()
    desc: string;

    @ApiProperty()
    data: {
        orderCode: number;
        amount: number;
        description: string;
        accountNumber: string;
        reference: string;
        transactionDateTime: string;
        currency: string;
        paymentLinkId: string;
        code: string;
        desc: string;
    };

    @ApiProperty()
    signature: string;
}

