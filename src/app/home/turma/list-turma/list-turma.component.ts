import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { Page } from 'src/app/model/page.model';
import { Turma } from 'src/app/model/turma.model';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-list-turma',
  templateUrl: './list-turma.component.html',
  styleUrls: ['./list-turma.component.scss']
})
export class ListTurmaComponent implements OnInit, OnDestroy {

  turmaList: Page<Turma> = new Page<Turma>();
  pageSize: number  = 1;
  totalPages: Array<number> = [];
  obterTurmasSub: Subscription = new Subscription();

  visitedPages: Array<number> = [0];
  allContent: Turma[] = [];
  currentPage: number = -1;

  constructor(private turmaService: TurmaService) { }

  ngOnInit(): void {
    this.obterTurmasSub = this.turmaService.obterTurmas({ page: 0, pageSize: this.pageSize }).subscribe({
      next: (response) => {
        console.log(response);
        this.turmaList = response;
        this.allContent = response.content;
        this.currentPage = 0;

        this.totalPages = Array(response.totalPages).fill(0).map((_, i) => i);

        console.log(this.totalPages);
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  ngOnDestroy(): void {
    this.obterTurmasSub.unsubscribe();
  }

  onNextPage() {

    if(this.currentPage === this.totalPages.length -1) {
      return;
    }

    const nextPage = this.currentPage + 1;

    if (this.visitedPages.find(e => e === nextPage) !== undefined) {
      console.log(this.allContent);

      this.turmaList.content = this.getCurrentElements(nextPage, this.pageSize, this.allContent);
      console.log(this.turmaList.content);
      this.currentPage = nextPage;
      return;
    }

    this.turmaService.obterTurmas({ page: nextPage, pageSize: this.pageSize }).subscribe({
      next: (response) => {
        console.log(response);
        this.visitedPages.push(nextPage);
        this.allContent.push(...response.content);
        this.allContent.sort((a,b)=> a.id! - b.id!);
        this.turmaList = response;
        this.currentPage = nextPage;
        /*   this.turmaList.content.push(...response.content);
          this.turmaList = {
            ...response,
            content: this.turmaList.content,
            numberOfElements: this.turmaList.numberOfElements += response.numberOfElements
          } */

      },
      error: (err) => {
        console.error(err);

      }
    });
  }


  onPrevPage() {

    if(this.currentPage === 0) {
      return;
    }

    const prevPage = this.currentPage - 1;

    if (this.visitedPages.find(e => e === prevPage) !== undefined) {
      console.log(this.allContent);

      this.turmaList.content = this.getCurrentElements(prevPage, this.pageSize, this.allContent);
      console.log(this.turmaList.content);
      this.currentPage = prevPage;
      return;
    }

    this.turmaService.obterTurmas({ page: prevPage, pageSize: this.pageSize }).subscribe({
      next: (response) => {
        console.log(response);
        this.visitedPages.push(prevPage);
        this.allContent.push(...response.content);
        this.allContent.sort((a,b)=> a.id! - b.id!);
        this.turmaList = response;
        this.currentPage = prevPage;
        /*   this.turmaList.content.push(...response.content);
          this.turmaList = {
            ...response,
            content: this.turmaList.content,
            numberOfElements: this.turmaList.numberOfElements += response.numberOfElements
          } */

      },
      error: (err) => {
        console.error(err);

      }
    });
  }

  onPage(page: number) {
    this.currentPage = page;


    console.log(this.visitedPages);
    console.log(this.visitedPages.find(e => e === page));

    if (this.visitedPages.find(e => e === page) !== undefined) {
      console.log(this.allContent);

      this.turmaList.content = this.getCurrentElements(page, this.pageSize, this.allContent);
      console.log(this.turmaList.content);

      return;
    }

    this.turmaService.obterTurmas({ page: page, pageSize: this.pageSize }).subscribe({
      next: (response) => {
        console.log(response);
        this.visitedPages.push(page);
        this.allContent.push(...response.content);
        this.allContent.sort((a,b)=> a.id! - b.id!);
        console.log(this.allContent);

        this.turmaList = response;

      },
      error: (err) => {
        console.error(err);

      }
    });
  }


  getCurrentElements(page: number, pageSize: number, array: Array<any>) {
    console.log(page);

 /*    if (page === 0) {
      console.log("entrou na pagina 0", array.slice(page, pageSize));

      return array.slice(page, pageSize);
    }
    if (page === array.length) {
      console.log("entrou na ultima pagina", array.slice(page, pageSize));

      return array.slice(-pageSize);
    } */
    const offSet = page * pageSize;
    console.log(offSet);

    console.log("entrou na pagina intermediaria", array.slice(offSet, offSet + pageSize));

    const response = array.slice(offSet, offSet + pageSize);

    if(response.length === 0) {
      console.log("entrou");

      return array.slice(-pageSize);
    }
    return response;

  }

}
