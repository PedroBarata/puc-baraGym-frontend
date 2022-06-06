import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoading = false;
  authStatusSub: Subscription | null = null;

  constructor(public authService: AuthService, public notificationService: NotificationService) {}

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthListener().subscribe(
      authStatus => {
        console.log(authStatus);
      }
    )
  }

  ngOnDestroy() {
    this.authStatusSub as Subscription;
    this.authStatusSub?.unsubscribe();
  }
}
