import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly _loadingSubject = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loadingSubject.asObservable();

  setLoading(value: boolean): void {
    this._loadingSubject.next(value);
  }
}
