import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { Alert, AlertType } from '../model/alert.model';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable();
  }

  // convenience methods
  success(message: string, options?: any) {
    const alert: Alert = { ...options, type: AlertType.Success, message }
    this.alert(alert);  }

  error(message: string, options?: any) {
    const alert: Alert = { ...options, type: AlertType.Error, message }
    this.alert(alert);
  }

  info(message: string, options?: any) {
    const alert: Alert = { ...options, type: AlertType.Info, message }
    this.alert(alert);
  }

  warn(message: string, options?: any) {
    const alert: Alert = { ...options, type: AlertType.Warning, message }
    this.alert(alert);
  }

  // main alert method
  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId) {
    const alert: Alert = {
      id: id
    }
    this.subject.next(alert);
  }
}
