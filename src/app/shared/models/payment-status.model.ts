import { PaymentMethod } from './payment-method.model';

export interface PaymentStatus {
    idPaymentStatus?: number;
    statusName?: string;
    responseCode?: string;
    isPaid?: boolean;
    paymentMethod?: PaymentMethod;
}