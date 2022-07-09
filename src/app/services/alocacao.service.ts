import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { CreateAlocacao, ListAlocacao } from "../model/alocacao.model";
import { Page } from "../model/page.model";
import { Agendamento, UsuarioAgendamento } from "../model/usuario-agendamento.model";

@Injectable({ providedIn: "root" })
export class AlocacaoService {

  constructor(
    private http: HttpClient,
  ) { }

  obterAlocacoes(pagination?: { page: number, pageSize: number }) {
    if (pagination) {
      return this.http
        .get<Page<ListAlocacao>>(
          `${environment.apiUrl}/alocacoes?page=${pagination.page}&size=${pagination.pageSize}`
        );
    }
    return this.http
      .get<Page<ListAlocacao>>(
        `${environment.apiUrl}/alocacoes`
      );
  }

  obterAlocacao(alocacaoId: number) {
    return this.http
    .get<ListAlocacao>(
      `${environment.apiUrl}/alocacoes/${alocacaoId}`
    );
  }


  cadastrarAlocacao(alocacao: CreateAlocacao) {
    const data: CreateAlocacao = { ...alocacao };

    return this.http
      .post<Agendamento>(
        `${environment.apiUrl}/alocacoes`,
        data
      );
  }

  atualizarAlocacao(alocacao: CreateAlocacao, alocacaoId: number) {
    const data: CreateAlocacao = { ...alocacao };
    console.log(data);

    return this.http
      .put<CreateAlocacao>(
        `${environment.apiUrl}/alocacoes/${alocacaoId}`,
        data
      );
  }

  deletarAlocacao(alocacao: number) {
    return this.http
      .delete<void>(
        `${environment.apiUrl}/alocacoes/${alocacao}`
      );
  }

}
