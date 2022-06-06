import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../services/error.service';
import { LoggingService } from '../services/logging.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private errorDialogService: NotificationService,
    private zone: NgZone) { }

  handleError(error: any) {
          console.log('error handler');

    //   const errorService = this.injector.get(ErrorService);
    //   const logger = this.injector.get(LoggingService);
    //   const notifier = this.injector.get(NotificationService);

    //   console.log('error handler');

    //   let message;
    //   let stackTrace: string | null;
    //   if (error instanceof HttpErrorResponse) {
    //     // Server error
    //     message = errorService.getServerErrorMessage(error);
    //     //stackTrace = errorService.getServerErrorStackTrace(error);
    //     notifier.error(message);
    //   } else {
    //     // Client Error
    //     message = errorService.getClientErrorMessage(error);
    //     notifier.error(message);
    //   }
    //   // Always log errors
    //   logger.logError(message);
    //   console.error(error);
    // }

    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }
    this.zone.run(() =>
      this.errorDialogService.error(
        error?.message || 'Undefined client error',
        error?.status
      )
    );

    console.error('Error from global error handler', error);
  }
}
