import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      { titulo: "Nome", nomeCampo: "atividade", isNameField: true },
      { titulo: "Turma", nomeCampo: "turma", isNameField: true },
      { titulo: "Início", nomeCampo: "horaInicio" },
      { titulo: "Término", nomeCampo: "horaFim" },
      { titulo: "Dia da semana", nomeCampo: "diaSemana", isNameField: true },
      { titulo: "Opções", nomeCampo: "", isDelete: true, isEdit: true }
    ],
    registrosPorPagina: 10
  }


  constructor(private alocacaoService: AlocacaoService,
              private route: Router) { }

  ngOnInit(): void {
  }

  obterAlocacoes = (pagination?: { page: number, pageSize: number }) => {
    if (pagination) {
      return this.alocacaoService.obterAlocacoes({ page: pagination.page, pageSize: pagination.pageSize });
    }
    return this.alocacaoService.obterAlocacoes();
  }

  deletarAlocacao = (alocacao: ListAlocacao) => {
    return this.alocacaoService.deletarAlocacao(alocacao.id!);
  }

  editarAlocacao = (alocacao: ListAlocacao) => {
    this.route.navigate(['/alocacoes', alocacao.id!]);
  }
}
