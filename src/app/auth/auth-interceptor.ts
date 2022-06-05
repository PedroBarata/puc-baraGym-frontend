import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable()/* Anotação para injetar serviços dentro de serviços */
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getAccessToken();
        /* Não é bom mexer com a requisição diretamente, para isso clonamos. */
        /* Adicionamos o header, com o mesmo nome que estamos esperando no backend: "authorization" */
        if (authToken) {
            const authRequest = req.clone({
                headers: req.headers.set("Authorization", authToken as string)
            });
            return next.handle(authRequest);
        }

        return next.handle(req);
    }
}