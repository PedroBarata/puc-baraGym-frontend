import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { AuthData } from "../model/auth-data.model";
import { JwtSub } from "../model/jwt-sub.model";

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class AuthService {
    private accessToken: string | null = null;
    private jwtInfo: JwtSub | null = null;
    private tokenTimer: any; //Nao reconheceu o NodeJs.Timer, por isso o any
    private isAuthenticated = false;
    private matricula: string | null = null;
    private authListener = new Subject<boolean>();
    constructor(private http: HttpClient, private router: Router) { }

    getToken() {
        return this.accessToken;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthListener() {
        return this.authListener.asObservable();
    }

    getMatricula() {
        return this.matricula;
    }

    criarUsuario(nome: string, email: string, senha: string) {
        const authData: AuthData = {
            nome: nome,
            email: email,
            senha: senha
        };


        this.http
            .post(BACKEND_URL + "/usuarios", authData)
            .subscribe({
                next: () => this.router.navigate(["/"]),
                error: () => this.authListener.next(false)
            });
    }

    login(email: string, senha: string) {
        const authData: AuthData = {
            email: email,
            senha: senha
        };

        this.http
            .post<{ accessToken: string }>(
                BACKEND_URL + "/login",
                authData
            ).subscribe({
                next: (response) => {
                    const accessToken = response.accessToken;
                    //const expiresInDuration = response.expiresIn;
                    //this.setAuthTimer(expiresInDuration);
                    this.accessToken = accessToken;

                    if (accessToken) {
                        this.jwtInfo = this.parseJwt(accessToken);
                        this.isAuthenticated = true;
                        this.matricula = this.jwtInfo.matricula;
                        /* Soma-se a expiração à data atual, em milisegundos */
                        const expirationDate = new Date(this.jwtInfo.exp * 1000);
                        this.authListener.next(true);
                        this.saveAuthData(accessToken, expirationDate, this.matricula);
                        this.router.navigate(["/"]);
                    }
                },
                error: (e) => this.authListener.next(false)
            });
    }

    deslogar() {
        this.accessToken = null;
        this.matricula = null;
        this.isAuthenticated = false;
        this.authListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/"]);
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        /* Se o tempo de expiração for maior que zero, quer dizer que a data de expiração é maior
        que a data atual, logo é um token válido */
        if (expiresIn > 0) {
            this.accessToken = authInformation.token;
            this.isAuthenticated = true;
            this.matricula = authInformation.matricula;
            this.setAuthTimer(expiresIn / 1000); /* divide por 1000 pois depois ele multiplica, e já está em ms */
            this.authListener.next(true);
        }
    }

    /* SetTimeOut é uma função que é executada após determinado tempo,
          nesse caso, depois do tempo de duração do token, em milisegundos,
          ele executa o logout da aplicacao */
    /* Ele é armazenado numa variável, para depois do logout, ser zerada (clear) */

    private setAuthTimer(duration: number) {
        console.log("Setting timer:", duration);

        this.tokenTimer = setTimeout(() => {
            this.deslogar();
        }, duration * 1000);
    }

    /* Aqui é interessante passar um Date e não um número,
    que é um número relativo e não teremos uma ideia clara
    da data quando voltarmos no futuro */
    private saveAuthData(token: string, expirationDate: Date, matricula: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("matricula", matricula);

    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const matricula = localStorage.getItem("matricula");
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            matricula: matricula,
            expirationDate: new Date(expirationDate)
        }
    }

    private parseJwt(value: string): JwtSub {
        var base64Url = value.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };
    /* OBS: SEMPRE QUE FOR GRAVAR UMA DATA, PASSE PARA ISOSTRING! SEMPRE QUE FOR EXIBÍ-LA, PASSE PARA DATE */
}
