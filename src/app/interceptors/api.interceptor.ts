import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { CustomerAuthenticationService } from '../services/customer/customer-authentication.service';
import { LoadingService } from '../services/loading.service';
import { ErrorService } from '../services/error.service';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  pendingRequestsCount = 0;

  constructor(
    private router: Router,
    private customerAuthenticationService: CustomerAuthenticationService,
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.pendingRequestsCount++;
    this.loadingService.setLoading(true);

    return next.handle(request).pipe(
      // tap((evt) => {
      //   if (evt instanceof HttpResponse) {
      //     // this.loadingService.setLoading(false);
      //   }
      // }),
      finalize(() => {
        this.pendingRequestsCount--;
        if (this.pendingRequestsCount < 1) {
          this.loadingService.setLoading(false);
        }
      }),
      catchError((err) => {
        switch (err.status) {
          case 400:
            if (err.error.errors) {
              let errors = '';
              let errorNumber = 1;

              for (const error in err.error.errors) {
                errors += `(${errorNumber}) - ${err.error.errors[error]} `;
                errorNumber++;
              }

              this.errorService.setErrorMessage(errors);
            } else {
              this.errorService.setErrorMessage(err.error.message);
            }
            break;
          case 401:
            this.customerAuthenticationService.logout();
            break;
          case 404:
            this.router.navigate(['/404']);
            break;
          case 405:
            break;
          case 409:
            break;
          case 500:
            this.errorService.setErrorMessage(err.message);
            break;
        }

        return throwError(() => err);
      })
    );
  }
}
