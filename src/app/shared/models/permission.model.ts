import { Module } from './module.model';

export interface Permission {
    idPermission?: number;
    isCreateAllowed?: boolean;
    isRetrieveAllowed?: boolean;
    isUpdateAllowed?: boolean;
    isDeleteAllowed?: boolean;
    module?: Module;
}