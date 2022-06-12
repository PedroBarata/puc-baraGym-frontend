import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataTable } from 'src/app/model/data-table.model';
import { Page } from 'src/app/model/page.model';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit, OnDestroy {

  @Input()
  public tableConfig!: DataTable;

  @Input()
  public listaFuncao!: (pagination: { page: number, pageSize: number }) => Observable<Page<any>>;

  paginacaoList: Page<any> = new Page<any>();
  paginasTotais: Array<number> = [];
  subscription: Subscription = new Subscription();

  paginasVisitadas: Array<number> = [0];
  conteudoTotal: any[] = [];
  paginaAtual: number = -1;

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.listaFuncao({ page: 0, pageSize: this.tableConfig.registrosPorPagina })
      .subscribe({
        next: (response) => {
          this.paginacaoList = response;
          this.conteudoTotal = response.content;
          this.paginaAtual = 0;
          this.paginasTotais = Array(response.totalPages).fill(0).map((_, i) => i);
        },
        error: (e) => {
          console.error(e);
        }
      });
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  onProximaPagina() {

    if (this._paginaAtualEhAUltima()) {
      return;
    }

    const proxPagina = this.paginaAtual + 1;

    if (this.paginasVisitadas.find(e => e === proxPagina) !== undefined) {
      this._carregaEmMemoria(proxPagina);
      return;
    }

    this.subscription = this._obtemDadosServico(proxPagina);
  }

  onPaginaAnterior() {
    if (this._paginaAtualEhAPrimeira()) {
      return;
    }

    const paginaAnterior = this.paginaAtual - 1;
    if (this.paginasVisitadas.find(e => e === paginaAnterior) !== undefined) {
      this._carregaEmMemoria(paginaAnterior);
      return;
    }

    this.subscription = this._obtemDadosServico(paginaAnterior);
  }

  onPage(page: number) {
    this.paginaAtual = page;

    if (this.paginasVisitadas.find(e => e === page) !== undefined) {
      this._carregaEmMemoria(page);
      return;
    }

    this.subscription = this._obtemDadosServico(page);
  }


  private _obtemElementosDaPaginaAtual(page: number, pageSize: number, array: Array<any>) {
    const offSet = page * pageSize;

    const response = array.slice(offSet, offSet + pageSize);

    /* Se for a ultima pagina, pega o array de trás pra frente */
    if (response.length === 0) {
      return array.slice(-pageSize);
    }
    return response;

  }

  private _paginaAtualEhAUltima() {
    return (this.paginaAtual === this.paginasTotais.length - 1);
  }

  private _paginaAtualEhAPrimeira() {
    return this.paginaAtual === 0;
  }

  private _carregaEmMemoria(pagina: number) {
    this.paginacaoList.content = this._obtemElementosDaPaginaAtual(pagina, this.tableConfig.registrosPorPagina, this.conteudoTotal);
    this.paginaAtual = pagina;
  }

  private _obtemDadosServico(pagina: number) {
    return this.listaFuncao({ page: pagina, pageSize: this.tableConfig.registrosPorPagina }).subscribe({
      next: (response) => {
        console.log(response);
        this.paginasVisitadas.push(pagina);
        this.conteudoTotal.push(...response.content);
        this.conteudoTotal.sort((a, b) => a.id! - b.id!);
        console.log(this.conteudoTotal);

        this.paginacaoList = response;

      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
