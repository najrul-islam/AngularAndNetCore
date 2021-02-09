
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {tap, take, filter, switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/account/auth.service';



@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );
    private isRefreshing = false;
    constructor(private auth: AuthService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(request).pipe(tap(
           (event: HttpEvent<any>) => event instanceof HttpResponse ? 'succeeded' : '',
            (error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })));
    }

private handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
  if (!this.isRefreshing) {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.auth.refreshToken().subscribe(
      switchMap((token: any) => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(token.access_token);
        return next.handle(this.addToken(request, token.access_token));
      }));

  } else {
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        return next.handle(this.addToken(request, jwt));
      }));
  }
}
    private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
}
