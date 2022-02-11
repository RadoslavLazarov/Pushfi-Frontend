import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private http: HttpClient) {}

  getOffer(): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/offer/sendOffer`, {
        // params: { id },
      })
      .pipe(
        // tap((isDeleted: boolean) => {
        //   localStorage.removeItem('currentUser');
        //   this.currentUserSubject.next(null);

        //   return isDeleted;
        // }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  getLatestOffer(): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/offer/getLatestOffer`)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
