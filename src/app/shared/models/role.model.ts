import { Permission } from "./permission.model";

export interface Role {
    idRole?: number;
    roleName?: string;
    isActive?: boolean;
    created?: string;
    modified?: string;
    permissions?: Permission[];
}
