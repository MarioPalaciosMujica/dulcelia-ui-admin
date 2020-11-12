import { Image } from './image.model';

export interface Brand {
    idBrand?: number;
    name?: string;
    created?: string;
    modified?: string;
    image?: Image;
}