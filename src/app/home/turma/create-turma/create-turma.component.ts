import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-create-turma',
  templateUrl: './create-turma.component.html',
  styleUrls: ['./create-turma.component.scss']
})
export class CreateTurmaComponent implements OnInit {

  constructor(
    private turmaService: TurmaService,
    private notificacaoService: NotificacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCriarTurma(form: NgForm) {

    console.log(form);


    if (form.invalid) {
      return;
    }
    this.turmaService.cadastrarTurmas(form.value.nome, form.value.capacidade).subscribe({
      next: () => {
        this.notificacaoService.success("Cadastro realizado com sucesso.");
        this.router.navigate(["/turmas"]);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
