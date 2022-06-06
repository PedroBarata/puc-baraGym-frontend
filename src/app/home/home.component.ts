import { Component, OnInit } from '@angular/core';
import { JwtConstants } from '../common/constants/jwt-constants';
import { RoleEnum } from '../model/jwt-sub.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  ehAdmin() {
    return localStorage.getItem(JwtConstants.VAR_ROLE) === RoleEnum.ROLE_ADMIN.toString()
  }

  onDeslogar() {
    this.authService.deslogar();
  }

}
