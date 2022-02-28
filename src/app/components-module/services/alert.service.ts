import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertModel, AlertTypes } from '../models/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertSerice {
  private subject = new BehaviorSubject<AlertModel | null>(null);
  constructor() {}

  onAlert$(): Observable<AlertModel | null> {
    return this.subject.asObservable();
  }

  success(msg: string): void {
    this.alert({ type: AlertTypes.success, message: msg });
  }

  warning(msg: string): void {
    this.alert({ type: AlertTypes.warning, message: msg });
  }

  danger(msg: string): void {
    this.alert({ type: AlertTypes.danger, message: msg });
  }

  clearAlert(): void {
    this.subject.next(null);
  }

  alert(value: AlertModel | null): void {
    this.subject.next(value);
  }
}
