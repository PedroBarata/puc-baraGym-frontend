import { Component, OnInit } from '@angular/core';
import { ListAlocacao } from 'src/app/model/alocacao.model';
import { DataTable } from 'src/app/model/data-table.model';
import { Page } from 'src/app/model/page.model';
import { AlocacaoService } from 'src/app/services/alocacao.service';

@Component({
  selector: 'app-list-alocacao',
  templateUrl: './list-alocacao.component.html',
  styleUrls: ['./list-alocacao.component.scss']
})
export class ListAlocacaoComponent implements OnInit {

  configuracaoTable: DataTable = {
    colunas: [
      { titulo: "Nome", nomeCampo: "nomeAtividade" },
      { titulo: "Turma", nomeCampo: "nomeTurma" },
      { titulo: "Início", nomeCampo: "horaInicio" },
      { titulo: "Término", nomeCampo: "horaFim" },
      { titulo: "Dia da semana", nomeCampo: "nomeDiaSemana" }
    ],
    registrosPorPagina: 2
  }


  constructor(private alocacaoService: AlocacaoService) { }

  ngOnInit(): void {
  }

  obterAlocacoes = (pagination?: { page: number, pageSize: number }) => {
    if (pagination) {
      return this.alocacaoService.obterAlocacoes({ page: pagination.page, pageSize: pagination.pageSize });
    }
    return this.alocacaoService.obterAlocacoes();
  }
}
