import { Component, OnInit } from '@angular/core';
import { ListAlocacao } from 'src/app/model/alocacao.model';
import { Page } from 'src/app/model/page.model';
import { AlocacaoService } from 'src/app/services/alocacao.service';

@Component({
  selector: 'app-list-alocacao',
  templateUrl: './list-alocacao.component.html',
  styleUrls: ['./list-alocacao.component.scss']
})
export class ListAlocacaoComponent implements OnInit {

  alocacoes: Page<ListAlocacao> = new Page<ListAlocacao>();

  constructor(private alocacaoService: AlocacaoService) { }

  ngOnInit(): void {
    this.alocacaoService.obterAlocacoes().subscribe({
      next: (response) => {
        console.log(response);
        this.alocacoes = response;
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

}
