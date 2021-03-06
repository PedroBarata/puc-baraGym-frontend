import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { JwtConstants } from "../common/constants/jwt-constants";
import { JwtUtil } from "../common/utils/jwt-util";
import { AuthData } from "../model/auth-data.model";
import { JwtSub } from "../model/jwt-sub.model";
import { NotificacaoService } from "./notificacao.service";


@Injectable({ providedIn: "root" })
export class AuthService {

  private _accessToken: string | null = null;
  private _jwtInfo: JwtSub | null = null;
  private _estaAutenticado = false;
  private _tokenTimer: any; //NodeJS.timeout
  private _authListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificacaoService
  ) { }

  getAccessToken() {
    return this._accessToken;
  }

  getEstaAutenticado() {
    return this._estaAutenticado;
  }

  getAuthListener() {
    return this._authListener.asObservable();
  }

  getMatricula() {
    return this._jwtInfo?.matricula;
  }

  getNome() {
    return this._jwtInfo?.nome;
  }

  getRole() {
    return this._jwtInfo?.role;
  }


  criarUsuario(nome: string, email: string, senha: string) {
    const authData: AuthData = {
      nome: nome,
      email: email,
      senha: senha
    };


    this.http
      .post(environment.apiUrl + "/usuarios", authData)
      .subscribe({
        next: () => {
          this.notificationService.success("Cadastro realizado com sucesso.");
          this.router.navigate(["/"]);
        },
        error: () => this._authListener.next(false)
      });
  };

  login(email: string, senha: string) {
    const authData: AuthData = {
      email: email,
      senha: senha
    };

    this.http
      .post<{ accessToken: string }>(
        environment.apiUrl + "/login",
        authData
      ).subscribe({
        next: (response) => {
          const accessToken = response.accessToken;
          this._accessToken = accessToken;

          this._jwtInfo = JwtUtil.parseJwt(accessToken);
          this._estaAutenticado = true;
          this._authListener.next(true);

          this._salvaAuthStorage(accessToken, this._jwtInfo);
          this._setAuthTimer();

          this.router.navigate(["/"]);
        },
        error: (e) => {
          console.error(e);

          this._authListener.next(false);
        }
      });
  }

  deslogar() {
    console.log('entrou!');

    this._accessToken = null;
    this._jwtInfo = null;
    this._estaAutenticado = false;
    this._authListener.next(false);

    clearTimeout(this._tokenTimer);
    this._limpaAuthStorage();

    this.router.navigate(["/auth"]);
  }

  autoAuthUser() {
    const authInformation = this._getAuthStorage();
    if (!authInformation) {
      return;
    }

    const now = new Date();
    const expiraEm = authInformation.expirationDate.getTime() - now.getTime();

    /* Se o tempo de expira????o for maior que zero, quer dizer que a data de expira????o ?? maior
    que a data atual, logo ?? um token v??lido */

    if (expiraEm > 0) {
      this._accessToken = authInformation.token;
      this._estaAutenticado = true;
      this._jwtInfo = JwtUtil.parseJwt(this._accessToken);

      this._setAuthTimer(); /* divide por 1000 pois depois ele multiplica, e j?? est?? em ms */
      this._authListener.next(true);
    }
  }

  private _setAuthTimer() {
    const authInformation = this._getAuthStorage();
    const now = new Date();
    const expiraEm = authInformation!.expirationDate.getTime() - now.getTime();
    console.log("Setting timer:", expiraEm);


    this._tokenTimer = setTimeout(() => {
      this.deslogar();
    }, expiraEm);
  }

  /* Aqui ?? interessante passar um Date e n??o um n??mero,
  que ?? um n??mero relativo e n??o teremos uma ideia clara
  da data quando voltarmos no futuro */
  private _salvaAuthStorage(accessToken: string, jwtSub: JwtSub) {
    localStorage.setItem(JwtConstants.VAR_TOKEN, accessToken);
    localStorage.setItem(JwtConstants.VAR_EXP, new Date(jwtSub.exp * 1000).toISOString());
    localStorage.setItem(JwtConstants.VAR_MATRICULA, jwtSub.matricula);
    localStorage.setItem(JwtConstants.VAR_NOME, jwtSub.nome);
    localStorage.setItem(JwtConstants.VAR_ROLE, jwtSub.role.toString());

  }

  private _limpaAuthStorage() {
    localStorage.removeItem(JwtConstants.VAR_TOKEN);
    localStorage.removeItem(JwtConstants.VAR_EXP);
    localStorage.removeItem(JwtConstants.VAR_MATRICULA);
    localStorage.removeItem(JwtConstants.VAR_NOME);
    localStorage.removeItem(JwtConstants.VAR_ROLE);
  }

  private _getAuthStorage() {
    const token = localStorage.getItem(JwtConstants.VAR_TOKEN);
    const expirationDate = localStorage.getItem(JwtConstants.VAR_EXP);
    const matricula = localStorage.getItem(JwtConstants.VAR_MATRICULA);

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      matricula: matricula,
      expirationDate: new Date(expirationDate)
    }
  }

  /* OBS: SEMPRE QUE FOR GRAVAR UMA DATA, PASSE PARA ISOSTRING! SEMPRE QUE FOR EXIB??-LA, PASSE PARA DATE */
}
