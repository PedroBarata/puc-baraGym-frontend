import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, finalize, delay } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { LoadingService } from '../services/loading.service';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(
    private notificationService: NotificationService,
    private loggingService: LoggingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept');
    return next.handle(request).pipe(
      retry(1),
      catchError((error: any) => {
        this.loggingService.logError(error);
        if (error.status === 403) {
          this.notificationService.error('E-mail ou senha inválidos.');
          return throwError(error)
        } else {
          return throwError(error);
        }
      })
    );
  }
}
