import { UserContact } from './user-contact.model';
import { Role } from './role.model';

export interface UserAccount {
    idUserAccount?: string;
    username?: string;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    created?: string;
    modified?: string;
    role?: Role;
    userContact?: UserContact;
}