import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  authStatusSub: Subscription | null = null;

  constructor(public authService: AuthService, public notificationService: NotificacaoService) {}

  ngOnInit() {
  }

  onLogin(form: NgForm) {
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
