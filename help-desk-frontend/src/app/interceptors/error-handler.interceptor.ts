import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  // interceptor that will handle errors
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        /** Exceptions to generalized error handling */
        if (request.url.includes('/me')) {
          return of(error as any);
        }
        /** Exceptions to generalized error handling */

        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client error: ${error.error.message}`;
        } else {
          errorMessage = `There was a ${error.status} error: ${error.error.message || error.statusText}`;
        }

        this.toastr.error(errorMessage, 'Error', {timeOut: 3000});
        throw new Error(errorMessage);
      })
    );
  }
}