import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { LoadingService } from '../loading.service';
import { User } from '../../models';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

const rootUrl = '/customerAuthentication';

@Injectable({
  providedIn: 'root',
})
export class CustomerAuthenticationService {
  options = { headers: { 'Content-Type': 'application/json' } };

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService
  ) {
    // Check if localStorage has item currentUser then parse it into an object or return null
    this.currentUserSubject = new BehaviorSubject<User>(
      localStorage.getItem('currentUser')
        ? JSON.parse(localStorage.getItem('currentUser') || '{}')
        : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.processStatusSubject = new BehaviorSubject<number>(0);
    this.processStatus$ = this.processStatusSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<User>;
  private processStatusSubject: BehaviorSubject<number>;
  public processStatus$: Observable<number>;
  private readonly _creditReportURLSubject = new BehaviorSubject<string>('');
  readonly creditReportURL$ = this._creditReportURLSubject.asObservable();

  setCreditReportURL(url: string): void {
    this._creditReportURLSubject.next(url);
  }

  login(data: any): Observable<any> {
    const jsonData = JSON.stringify(data);
    const urlPath = this.router.routerState.snapshot.url;
    const brokerPath = urlPath.split('/')[1];

    return this.http
      .post<any>(
        `${environment.apiUrl + rootUrl}/${brokerPath}/login`,
        jsonData,
        this.options
      )
      .pipe(
        map((user) => {
          // exclude CreditReportUrl prop from user object
          const newUser = {
            email: user.email,
            expiration: user.expiration,
            id: user.id,
            role: user.role,
            token: user.token,
          };
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          this.currentUserSubject.next(newUser);
          return user;
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  deleteCurrentUser(): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl + rootUrl}/delete`).pipe(
      tap((isDeleted: boolean) => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);

        return isDeleted;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  registration(data: any): Observable<any> {
    const jsonData = JSON.stringify(data);
    const urlPath = this.router.routerState.snapshot.url;
    const brokerPath = urlPath.split('/')[1];

    return this.http
      .post(
        `${environment.apiUrl + rootUrl}/${brokerPath}/registration`,
        jsonData,
        this.options
      )
      .pipe(
        map((user: any) => {
          // exclude CreditReportUrl prop from user object
          const newUser = {
            email: user.email,
            expiration: user.expiration,
            id: user.id,
            role: user.role,
            token: user.token,
          };
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          this.currentUserSubject.next(newUser);
          return user;
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
    // const options = { headers: { 'Content-Type': 'application/json' } };
    // return this.http
    //   .get(`${environment.apiUrl + rootUrl}/processstatus`, options)
    //   .pipe(
    //     map((model: any) => {
    //       this.processStatusSubject.next(model.processStatus);
    //       return model;
    //     }),
    //     catchError((error) => {
    //       return throwError(() => error);
    //     })
    //   );
  }

  processStatus(): Observable<any> {
    const options = { headers: { 'Content-Type': 'application/json' } };
    const urlPath = this.router.routerState.snapshot.url;
    const brokerPath = urlPath.split('/')[1];

    return this.http
      .get(
        `${environment.apiUrl + rootUrl}/processstatus/${brokerPath}`,
        options
      )
      .pipe(
        map((model: any) => {
          this.processStatusSubject.next(model.processStatus);
          return model;
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  // getCreditOffer(data: any): Observable<any> {
  //   const url = baseUrl + '/credit-report';
  //   const jsonData = JSON.stringify(data);
  //   const options = { headers: {'Content-Type': 'application/json'} };
  //   this._loadingSubject.next(true);

  //   return this.http.post(url, jsonData, options).pipe(
  //     finalize(() => this._loadingSubject.next(false)));
  // }
}
