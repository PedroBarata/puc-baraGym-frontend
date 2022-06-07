import { Component, OnInit } from '@angular/core';
import { Atividade } from 'src/app/model/atividade.model';
import { Page } from 'src/app/model/page.model';
import { AtividadeService } from 'src/app/services/atividade.service';

@Component({
  selector: 'app-list-aula-atividade',
  templateUrl: './list-aula-atividade.component.html',
  styleUrls: ['./list-aula-atividade.component.scss']
})
export class ListAulaAtividadeComponent implements OnInit {

  atividadeList: Page<Atividade> | null = null;

  constructor(private atividadeService: AtividadeService) { }

  ngOnInit(): void {
    this.atividadeService.obterTodasAtivitdades().subscribe({
      next: (response) => {
        this.atividadeList = response;

      },
      error: (e) => {
        console.error(e);
      }
    })
  }

}
