
export interface Coupon {
    idCoupon?: number;
    code?: string;
    name?: string;
    description?: string;
    percentage?: number;
    fixedAmount?: number;
    expirationDate?: string;
    isActive?: boolean;
    created?: string;
    modified?: string;
}