import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Atividade } from "../model/atividade.model";
import { Page } from "../model/page.model";
import { UsuarioAtvidade } from "../model/usuario-atividade.model";

@Injectable({ providedIn: "root" })
export class AtividadeService {

  constructor(
    private http: HttpClient,
  ) { }

  obterAtividadesDoUsuario(matricula: string)   {

      return this.http
        .get<UsuarioAtvidade[]>(
          `${environment.apiUrl}/usuarios/${matricula}/atividades`
        );
    }

    obterTodasAtividades(page: number, pageSize: number)   {

      return this.http
        .get<Page<Atividade>>(
          `${environment.apiUrl}/atividades?page=${page}&size${pageSize}`
        );
    }
  }
