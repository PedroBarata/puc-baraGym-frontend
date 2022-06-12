import { Component, OnInit } from '@angular/core';
import { Atividade } from 'src/app/model/atividade.model';
import { DataTable } from 'src/app/model/data-table.model';
import { Page } from 'src/app/model/page.model';
import { AtividadeService } from 'src/app/services/atividade.service';

@Component({
  selector: 'app-list-aula-atividade',
  templateUrl: './list-aula-atividade.component.html',
  styleUrls: ['./list-aula-atividade.component.scss']
})
export class ListAulaAtividadeComponent implements OnInit {

  configuracaoTable: DataTable = {
    colunas: [
      { titulo: "Nome", nomeCampo: "nome" },
      { titulo: "Valor/Dia", nomeCampo: "valorDia", isCurrency: true }
    ],
    registrosPorPagina: 2
  }


  constructor(private atividadeService: AtividadeService) { }

  ngOnInit(): void {
  }

  obterAtividades = (pagination?: { page: number, pageSize: number }) => {
    if (pagination) {
      return this.atividadeService.obterTodasAtividades({ page: pagination.page, pageSize: pagination.pageSize });
    }
    return this.atividadeService.obterTodasAtividades();
  }

}
