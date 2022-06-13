import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = new Subject<boolean>();


  // main alert method
  showLoading() {
    this.isLoading.next(true);
  }

  // clear alerts
  dismissLoading() {
    this.isLoading.next(false);
  }
}
