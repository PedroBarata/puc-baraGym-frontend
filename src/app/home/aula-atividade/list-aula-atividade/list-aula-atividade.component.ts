import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      { titulo: "Valor/Dia", nomeCampo: "valorDia", isCurrency: true },
      { titulo: "Opções", nomeCampo: "", isDelete: true, isEdit: true }
    ],
    registrosPorPagina: 10
  }


  constructor(private atividadeService: AtividadeService,
    private route: Router) { }

  ngOnInit(): void {
  }

  obterAtividades = (pagination?: { page: number, pageSize: number }) => {
    if (pagination) {
      return this.atividadeService.obterTodasAtividades({ page: pagination.page, pageSize: pagination.pageSize });
    }
    return this.atividadeService.obterTodasAtividades();
  }

  deletarAtividade = (atividade: Atividade) => {
    return this.atividadeService.deletarAtividade(atividade.id!);
  }

  editarAtividade = (atividade: Atividade) => {
    this.route.navigate(['/aula-atividade', atividade.id!]);
  }

}
