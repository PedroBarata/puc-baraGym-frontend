import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Atividade } from "../model/atividade.model";
import { Page } from "../model/page.model";
import { UsuarioAlocacaoAgendamento } from "../model/usuario-alocacao-agendamento.model";
import { CreateUsuarioAtividade, UsuarioAtividade } from "../model/usuario-atividade.model";

@Injectable({ providedIn: "root" })
export class AtividadeService {

  constructor(
    private http: HttpClient,
  ) { }

  obterAtividadesDoUsuario(matricula: string) {

    return this.http
      .get<UsuarioAtividade[]>(
        `${environment.apiUrl}/usuarios/${matricula}/atividades`
      );
  }

  obterTodasAtividades(page: number, pageSize: number) {

    return this.http
      .get<Page<Atividade>>(
        `${environment.apiUrl}/atividades?page=${page}&size=${pageSize}`
      );
  }

  cadastrarUsuarioAtividade(matricula: string, createUsuarioAtividade: CreateUsuarioAtividade): Observable<Object> {

    return this.http
      .post(
        `${environment.apiUrl}/usuarios/${matricula}/atividades`,
        createUsuarioAtividade
      );
  }

  obterAlocacoesEAgendamentosDoUsuario(matricula: string, usuarioAtividadeId: number, pagination?: { page: number, pageSize: number }) {

    if (pagination) {
      return this.http
      .get<Page<UsuarioAlocacaoAgendamento>>(
        `${environment.apiUrl}/usuarios/${matricula}/atividades/${usuarioAtividadeId}/alocacoes?page=${pagination.page}&size=${pagination.pageSize}`
      )
    }

    return this.http
    .get<Page<UsuarioAlocacaoAgendamento>>(
      `${environment.apiUrl}/usuarios/${matricula}/atividades/${usuarioAtividadeId}/alocacoes`
    )
  }
}
