import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AtividadeService } from 'src/app/services/atividade.service';
import { NotificacaoService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-atividade',
  templateUrl: './create-atividade.component.html',
  styleUrls: ['./create-atividade.component.scss']
})
export class CreateAtividadeComponent implements OnInit {

  constructor(
    private atividadeService: AtividadeService,
    private notificacaoService: NotificacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCriarAtividade(form: NgForm) {

    console.log(form);


    if (form.invalid) {
      return;
    }
    this.atividadeService.cadastrarAtividade(form.value.nome, form.value.descricao, form.value.valorDia).subscribe({
      next: () => {
        this.notificacaoService.success("Cadastro realizado com sucesso.");
        this.router.navigate(["/aula-atividade"]);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
