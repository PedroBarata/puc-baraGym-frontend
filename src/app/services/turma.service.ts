import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Page } from "../model/page.model";
import { Turma } from "../model/turma.model";

@Injectable({ providedIn: "root" })
export class TurmaService {

  constructor(
    private http: HttpClient
  ) { }

  obterTurmas() {

    return this.http
      .get<Page<Turma>>(
        `${environment.apiUrl}/turmas`
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
}
