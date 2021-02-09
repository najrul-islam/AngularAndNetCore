import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorLogService {

    logError(error: any): any {
        if (error instanceof HttpErrorResponse) {
            console.log(error);
            console.error('There was an HTTP error.', error, 'Status code:', (error as HttpErrorResponse).status);
        } else if (error instanceof TypeError) {
            console.error('There was a Type error.', error, 'Component:', error.name);
        } else if (error instanceof Error) {
            console.error('There was a general error.', error);
        } else {
            console.error('Nobody threw an error but something happened!', error);
        }
    }
}
