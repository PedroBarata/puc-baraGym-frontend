import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Page } from "../model/page.model";
import { UsuarioAgendamento } from "../model/usuario-agendamento.model";

@Injectable({ providedIn: "root" })
export class AgendamentoService {

  constructor(
    private http: HttpClient,
  ) { }

  obterAgendamentosDoUsuario(matricula: string, pagination?: { page: number, pageSize: number }) {

    if (pagination) {
      return this.http
        .get<Page<UsuarioAgendamento>>(
          `${environment.apiUrl}/usuarios/${matricula}/agendamentos?page=${pagination.page}&size=${pagination.pageSize}`
        );
    }
    return this.http
      .get<Page<UsuarioAgendamento>>(
        `${environment.apiUrl}/usuarios/${matricula}/agendamentos`
      );
  }

  // obterTodasAtividades(page: number, pageSize: number) {

  //   return this.http
  //     .get<Page<Atividade>>(
  //       `${environment.apiUrl}/atividades?page=${page}&size=${pageSize}`
  //     );
  // }

  // cadastrarUsuarioAtividade(matricula: string, createUsuarioAtividade: CreateUsuarioAtividade): Observable<Object> {

  //   return this.http
  //     .post(
  //       `${environment.apiUrl}/usuarios/${matricula}/atividades`,
  //       createUsuarioAtividade
  //     );
  // }
}
