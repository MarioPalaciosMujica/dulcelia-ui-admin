import { Catalogue } from './catalogue.model';

export interface Category {
    idCategory?: number;
    name?: string;
    created?: string;
    modified?: string;
    catalogue?: Catalogue;
}