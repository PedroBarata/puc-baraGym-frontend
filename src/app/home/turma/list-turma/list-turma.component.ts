import { Component, OnInit } from '@angular/core';
import { DataTable } from 'src/app/model/data-table.model';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-list-turma',
  templateUrl: './list-turma.component.html',
  styleUrls: ['./list-turma.component.scss']
})
export class ListTurmaComponent implements OnInit {

  configuracaoTable: DataTable = {
    colunas: [
      { titulo: "Nome", nomeCampo: "nome" },
      { titulo: "Capacidade", nomeCampo: "capacidade" }
    ],
    registrosPorPagina: 10
  }

  constructor(private turmaService: TurmaService) { }


  ngOnInit(): void {
  }

  obterTurmas = (pagination?: { page: number, pageSize: number }) => {
    if (pagination) {
      return this.turmaService.obterTurmas({ page: pagination.page, pageSize: pagination.pageSize });
    }
    return this.turmaService.obterTurmas();
  }

}
