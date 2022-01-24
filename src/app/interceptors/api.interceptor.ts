import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { LoadingService } from '../services/loading.service';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true);

    return next.handle(request).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          this.loadingService.setLoading(false);
        }
      }),
      catchError((err) => {
        switch (err.status) {
          case 400:
            this.errorService.setErrorMessage(err.error.message);
            break;
          case 401:
            this.authenticationService.logout();
            break;
          case 404:
            this.errorService.setErrorMessage(err.message);
            break;
          case 405:
            break;
          case 409:
            break;
          case 500:
            this.errorService.setErrorMessage(err.message);
            break;
        }

        this.loadingService.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
