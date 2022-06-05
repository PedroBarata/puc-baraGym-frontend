import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private subject = new Subject<boolean>();

  // enable subscribing to alerts observable
  onLoading(): Observable<boolean> {
    return this.subject.asObservable();
  }

  // main alert method
  showLoading() {
    this.subject.next(true);
  }

  // clear alerts
  dismissLoading() {
    this.subject.next(false);
  }
}
