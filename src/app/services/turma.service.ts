import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Page } from "../model/page.model";
import { Turma } from "../model/turma.model";

@Injectable({ providedIn: "root" })
export class TurmaService {

  constructor(
    private http: HttpClient
  ) { }

  obterTurmas(pagination?: { page: number, pageSize: number }): Observable<Page<Turma>> {

    if (pagination) {
      return this.http
        .get<Page<Turma>>(
          `${environment.apiUrl}/turmas?page=${pagination.page}&size=${pagination.pageSize}`
        );
    }
    return this.http
      .get<Page<Turma>>(
        `${environment.apiUrl}/turmas`
      );
  }

  obterTurma(turmaId: number): Observable<Turma> {

    return this.http
      .get<Turma>(
        `${environment.apiUrl}/turmas/${turmaId}`
      );
  }

  atualizarTurmas(nome: string, capacidade: number, turmaId: number) {
    const data: Turma = {
      nome: nome,
      capacidade: capacidade
    }

    return this.http
      .put<Turma>(
        `${environment.apiUrl}/turmas/${turmaId}`,
        data
      );
  }


  cadastrarTurmas(nome: string, capacidade: number) {
    const data: Turma = {
      nome: nome,
      capacidade: capacidade
    }

    return this.http
      .post<Turma>(
        `${environment.apiUrl}/turmas`,
        data
      );
  }

  deletarTurma(turmaId: number): Observable<void> {
    return this.http
      .delete<void>(
        `${environment.apiUrl}/turmas/${turmaId}`,
      );
  }
}
