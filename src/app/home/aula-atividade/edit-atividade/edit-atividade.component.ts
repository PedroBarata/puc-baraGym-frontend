import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Atividade } from 'src/app/model/atividade.model';
import { AtividadeService } from 'src/app/services/atividade.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';

@Component({
  selector: 'app-edit-atividade',
  templateUrl: './edit-atividade.component.html',
  styleUrls: ['./edit-atividade.component.scss']
})
export class EditAtividadeComponent implements OnInit {

  id?: number;
  atividade?: Atividade;
  formAtividade: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    descricao: new FormControl(null),
    valorDia: new FormControl(null, [Validators.required])
  });


  constructor(
    private atividadeService: AtividadeService,
    private notificacaoService: NotificacaoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      this.atividadeService.obterAtividade(this.id).subscribe({
        next: (response) => {
          this.atividade = response;
          this.createForm(this.atividade);
        },
        error: (err) => {
          console.error(err);
        }
      });
    });
  }

  createForm(atividade: Atividade) {
    this.formAtividade = new FormGroup({
      nome: new FormControl(atividade.nome),
      descricao: new FormControl(atividade.descricao),
      valorDia: new FormControl(atividade.valorDia),
    })

  }

  onEditAtividade() {

    if (this.formAtividade.invalid) {
      return;
    }
    this.atividadeService.atualizarAtividade(
      this.formAtividade.value['nome'],
      this.formAtividade.value['descricao'],
      this.formAtividade.value['valorDia'], this.id!).subscribe({
        next: () => {
          this.notificacaoService.success("Cadastro atualizado com sucesso.");
          this.router.navigate(["/aula-atividade"]);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}
