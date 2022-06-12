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
    this.subscription = this.listaFuncao({ page: 0, pageSize: this.tableConfig.registrosPorPagina }).subscribe({
      next: (response) => {
        console.log(response);
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

    const nextPage = this.paginaAtual + 1;

    if (this.paginasVisitadas.find(e => e === nextPage) !== undefined) {
      console.log(this.conteudoTotal);

      this.paginacaoList.content = this.getCurrentElements(nextPage, this.tableConfig.registrosPorPagina, this.conteudoTotal);
      this.paginaAtual = nextPage;
      return;
    }

    this.subscription = this.listaFuncao({ page: nextPage, pageSize: this.tableConfig.registrosPorPagina }).subscribe({
      next: (response) => {
        console.log(response);
        this.paginasVisitadas.push(nextPage);
        this.conteudoTotal.push(...response.content);
        this.conteudoTotal.sort((a, b) => a.id! - b.id!);
        this.paginacaoList = response;
        this.paginaAtual = nextPage;
        /*   this.paginacaoList.content.push(...response.content);
          this.paginacaoList = {
            ...response,
            content: this.paginacaoList.content,
            numberOfElements: this.paginacaoList.numberOfElements += response.numberOfElements
          } */

      },
      error: (err) => {
        console.error(err);

      }
    });
  }


  onPaginaAnterior() {

    if (this.paginaAtual === 0) {
      return;
    }

    const prevPage = this.paginaAtual - 1;

    if (this.paginasVisitadas.find(e => e === prevPage) !== undefined) {
      console.log(this.conteudoTotal);

      this.paginacaoList.content = this.getCurrentElements(prevPage, this.tableConfig.registrosPorPagina, this.conteudoTotal);
      console.log(this.paginacaoList.content);
      this.paginaAtual = prevPage;
      return;
    }

    this.subscription = this.listaFuncao({ page: prevPage, pageSize: this.tableConfig.registrosPorPagina }).subscribe({
      next: (response) => {
        console.log(response);
        this.paginasVisitadas.push(prevPage);
        this.conteudoTotal.push(...response.content);
        this.conteudoTotal.sort((a, b) => a.id! - b.id!);
        this.paginacaoList = response;
        this.paginaAtual = prevPage;
        /*   this.paginacaoList.content.push(...response.content);
          this.paginacaoList = {
            ...response,
            content: this.paginacaoList.content,
            numberOfElements: this.paginacaoList.numberOfElements += response.numberOfElements
          } */

      },
      error: (err) => {
        console.error(err);

      }
    });
  }

  onPage(page: number) {
    this.paginaAtual = page;


    console.log(this.paginasVisitadas);
    console.log(this.paginasVisitadas.find(e => e === page));

    if (this.paginasVisitadas.find(e => e === page) !== undefined) {
      console.log(this.conteudoTotal);

      this.paginacaoList.content = this.getCurrentElements(page, this.tableConfig.registrosPorPagina, this.conteudoTotal);
      console.log(this.paginacaoList.content);

      return;
    }

    this.subscription = this.listaFuncao({ page: page, pageSize: this.tableConfig.registrosPorPagina }).subscribe({
      next: (response) => {
        console.log(response);
        this.paginasVisitadas.push(page);
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


  getCurrentElements(page: number, pageSize: number, array: Array<any>) {
    console.log(page);
    const offSet = page * pageSize;
    console.log(offSet);

    console.log("entrou na pagina intermediaria", array.slice(offSet, offSet + pageSize));

    const response = array.slice(offSet, offSet + pageSize);

    if (response.length === 0) {
      console.log("entrou");

      return array.slice(-pageSize);
    }
    return response;

  }

  private _paginaAtualEhAUltima() {
    return (this.paginaAtual === this.paginasTotais.length - 1);
  }

}
