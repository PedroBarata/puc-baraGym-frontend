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
}
