import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private readonly _errorMessageSubject = new BehaviorSubject<string>('');
  readonly errorMessage$ = this._errorMessageSubject.asObservable();

  setErrorMessage(value: string): void {
    this._errorMessageSubject.next(value);
  }
}
