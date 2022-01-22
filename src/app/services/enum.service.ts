import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnumService {
  private readonly _enumSubject = new BehaviorSubject<any>({});
  readonly enum$ = this._enumSubject.asObservable();

  constructor(private http: HttpClient) {}

  setEnums(data: any): void {
    this._enumSubject.next(data);
  }

  getEnums(): Observable<object> {
    return this.http.get<any>(`${environment.apiUrl}/enum`).pipe(
      tap((data) => {
        // const enums: any = {};

        // for (let i = 0; i < data.length; i++) {
        //   const item = data[i];
        //   console.log('item: ', item);
        //   // Sort by object values
        //   enums[item.name] = Object.keys(item.values).sort((a, b) => {
        //     console.log('a, b: ', a, b);
        //     return item.values[a] - item.values[b];
        //   });
        // }
        this.setEnums(data);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  // getEnum(name: string) {
  //   let test;
  //   this.enum$.subscribe((data) => {
  //     test = data.filter((el: any) => el.name === name);
  //     console.log(data);
  //   });
  //   return test;
  // }
}
