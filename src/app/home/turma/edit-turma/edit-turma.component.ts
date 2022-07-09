import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Turma } from 'src/app/model/turma.model';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-edit-turma',
  templateUrl: './edit-turma.component.html',
  styleUrls: ['./edit-turma.component.scss']
})
export class EditTurmaComponent implements OnInit {

  id?: number;
  turma?: Turma;
  formTurma: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    capacidade: new FormControl(null, [Validators.required])
  });

  constructor(
    private turmaService: TurmaService,
    private notificacaoService: NotificacaoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      this.turmaService.obterTurma(this.id).subscribe({
        next: (response) => {
          this.turma = response;
          this.createForm(this.turma);
        },
        error: (err) => {
          console.error(err);
        }
      });
    });
  }

  createForm(turma: Turma) {
    this.formTurma = new FormGroup({
      nome: new FormControl(turma.nome),
      capacidade: new FormControl(turma.capacidade)
    })
  }

  onEditTurma() {

    if (this.formTurma.invalid) {
      return;
    }

    this.turmaService.atualizarTurmas(
      this.formTurma.value['nome'],
      this.formTurma.value['capacidade'],
      this.id!)
      .subscribe({
        next: () => {
          this.notificacaoService.success("Cadastro atualizado com sucesso.");
          this.router.navigate(["/turmas"]);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}
