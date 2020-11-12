import { Option } from './option.model';

export interface Variant {
    idVariant?: number;
    sku?: number;
    basePriceAmount?: number;
    totalPriceAmount?: number;
    unitQuantity?: number;
    clientsCapacity?: number;
    isSelected?: boolean;
    created?: string;
    modified?: string;
    options?: Option[];
    //aux;
    idProduct?: number;
}
