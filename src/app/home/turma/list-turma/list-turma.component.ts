import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/model/page.model';
import { Turma } from 'src/app/model/turma.model';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-list-turma',
  templateUrl: './list-turma.component.html',
  styleUrls: ['./list-turma.component.scss']
})
export class ListTurmaComponent implements OnInit {

  turmaList: Page<Turma> | null = null;

  constructor(private turmaService: TurmaService) { }

  ngOnInit(): void {
    this.turmaService.obterTurmas().subscribe({
      next: (response) => {
        console.log(response);
        this.turmaList = response;
      },
      error: (e) => {
        console.error(e);
      }
    });

  }

}
