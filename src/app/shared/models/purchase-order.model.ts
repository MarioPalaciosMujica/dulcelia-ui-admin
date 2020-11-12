import { Shipment } from './shipment.model';
import { PaymentStatus } from './payment-status.model';
import { Tax } from './tax.model';
import { Product } from './product.model';
import { PurchaseOrderStatus } from './purchase-order-status.model';
import { PurchaseOrderSummary } from './purchase-order-summary.model';
import { Coupon } from './coupon.model';

export interface PurchaseOrder {
    idPurchaseOrder?: number;
    code?: string;
    idSession?: string;
    idTransaction?: number;
    transactionDate?: string;
    created?: string;
    modified?: string;
    msUserAccountsIdAccount?: number;
    purchaseOrderSummary?: PurchaseOrderSummary;
    purchaseOrderStatus?: PurchaseOrderStatus;
    paymentStatus?: PaymentStatus;
    shipment?: Shipment;
    coupon?: Coupon;
    products?: Product[];
    taxes?: Tax[];
}