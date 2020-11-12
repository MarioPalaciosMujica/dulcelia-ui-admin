import { Role } from './role.model';

export interface AuthModel {
    loggedIn?: boolean;
    clientName?: string;
    token?: string;
    role?: Role;
}