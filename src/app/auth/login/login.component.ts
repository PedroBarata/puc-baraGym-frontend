import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  authStatusSub: Subscription | null = null;

  constructor(public authService: AuthService, public notificationService: NotificationService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthListener().subscribe(
      authStatus => {
        console.log(authStatus);

        this.isLoading = false;
      }
    )
  }

  onLogin(form: NgForm) {
    this.notificationService.error('Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, .', { id: 'alert-1' });
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.senha);
  }

  ngOnDestroy() {
    this.authStatusSub as Subscription;
    this.authStatusSub?.unsubscribe();
  }
}
