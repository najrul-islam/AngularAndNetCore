import { Injectable, ErrorHandler } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerError {
  errorNumber: number;
  message: string;
  friendlyMessage: string;
}
export class ErrorHandleService implements ErrorHandler {
  handleError(error: any): void {
    const customError: TrackerError = new TrackerError();
    customError.errorNumber = 200;
    customError.message = (error as Error).message;
    customError.friendlyMessage = 'An error occurred. Please try again.';

    console.log(customError);
    console.error(error);
  }
  constructor() { }
}
