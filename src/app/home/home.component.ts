import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { JwtConstants } from '../common/constants/jwt-constants';
import { RoleEnum } from '../model/jwt-sub.model';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: Subject<boolean> = this.loadingService.isLoading;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    if(this.ehAdmin()) {
      this.router.navigate(["/turmas"]);
    }
  }

  ehAdmin() {
    return localStorage.getItem(JwtConstants.VAR_ROLE) === RoleEnum.ROLE_ADMIN.toString()
  }

  onDeslogar() {
    this.authService.deslogar();
  }

  getNomeUsuario() {
    return localStorage.getItem(JwtConstants.VAR_NOME);
  }

  ehRotaCriacaoUsuario()  {
    return this.router.url.includes('novo');
  }
}
