import { ErrorHandler } from '@angular/core';

export class AppError {
    constructor(public originalError?: any) {}
}

export class AppErrorHandler implements ErrorHandler{
    handleError(error: any): void {
        console.log('unexpected');
        console.log(error);
        alert('An unexpected error ocurred');
    }
}

export class BadInputError extends AppError {
}

export class NotFoundError extends AppError {
}
