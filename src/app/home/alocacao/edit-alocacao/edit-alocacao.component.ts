import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DiaSemana, diaSemanaList } from 'src/app/common/constants/dia-semana.constants';
import { CreateAlocacao, ListAlocacao } from 'src/app/model/alocacao.model';
import { Atividade } from 'src/app/model/atividade.model';
import { Turma } from 'src/app/model/turma.model';
import { AlocacaoService } from 'src/app/services/alocacao.service';
import { AtividadeService } from 'src/app/services/atividade.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-edit-alocacao',
  templateUrl: './edit-alocacao.component.html',
  styleUrls: ['./edit-alocacao.component.scss']
})
export class EditAlocacaoComponent implements OnInit {

  alocacao?: ListAlocacao;
  id?: number;

  turmas: Turma[] = [];
  atividades: Atividade[] = [];
  diaSemanaList: DiaSemana[] = diaSemanaList;
  horarioInicio: string | null = null;
  horarioFim: string | null = null;

  atividadeSelecionada: Atividade | null = null;
  turmaSelecionada: Turma | null = null;
  diaSemanaSelecionado: DiaSemana | null = null;

  private static TIME_REGEX = /^([0-1]?\d|2[0-3])(?::([0-5]?\d))?$/;

  constructor(
    private route: ActivatedRoute,
    private alocacaoService: AlocacaoService,
    private atividadeService: AtividadeService,
    private turmaService: TurmaService,
    private notificacaoService: NotificacaoService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];



      this.loadAlocacao(this.id).subscribe({
        next: (response) => {
          this.alocacao = response;
          console.log(response);

          this.loadAtividades().subscribe({
            next: (response) => {
              this.atividades = response.content;
              this.loadTumas().subscribe({
                next: (response) => {
                  this.turmas = response.content;
                  this.loadCampos();
                },
                error: (err) => {
                  console.error(err);
                }
              });

            },
            error: (err) => {
              console.error(err);
            }
          });
        },
        error: (err) => {
          console.error(err);
        }
      });
    });
  }

  loadAlocacao(id: number) {
    return this.alocacaoService.obterAlocacao(id);
  }

  loadCampos() {
    this.atividadeSelecionada = this.atividades.find(a => a.id === this.alocacao!.atividade.id)!;
    this.turmaSelecionada = this.turmas.find(t => t.id === this.alocacao!.turma.id)!;
    this.diaSemanaSelecionado = this.diaSemanaList.find(d => d.id === this.alocacao!.diaSemana.id)!;

    this.horarioInicio = this.alocacao!.horaInicio;
    this.horarioFim = this.alocacao!.horaFim;

    console.log(this.turmaSelecionada);

  }

  loadAtividades() {
    return this.atividadeService.obterTodasAtividades({ page: 0, pageSize: 1000 });
  }

  loadTumas() {
    return this.turmaService.obterTurmas({ page: 0, pageSize: 1000 })
  }

  onSelecionarTurma(turma: Turma) {
    console.log(turma);
    this.turmaSelecionada = turma;
  }


  onSelecionarDiaDaSemana(diaSemana: DiaSemana) {
    console.log(diaSemana);
    this.diaSemanaSelecionado = diaSemana;
  }
  onSelecionarAtividade(atividade: Atividade) {
    console.log(atividade);
    this.atividadeSelecionada = atividade;
  }


  validaDropdown(): boolean {
    if (
      !this.atividadeSelecionada
      || !this.turmaSelecionada
      || !this.diaSemanaSelecionado) {
      return false;
    }
    return true;
  }

  validaHorario(): boolean {
    console.log(this.horarioInicio);
    console.log(this.horarioFim);

    if (!this.horarioInicio || !this.horarioInicio.match(EditAlocacaoComponent.TIME_REGEX) ||
      !this.horarioFim || !this.horarioFim.match(EditAlocacaoComponent.TIME_REGEX)) {
      return false;
    }
    return true;
  }

  onEditarAlocacao() {
    if (!this.validaDropdown()) {
      this.notificacaoService.warn("Selecione turma, atividade/aula e dia da semana.");
      return;
    }

    if (!this.validaHorario()) {
      this.notificacaoService.warn("O horário de início e de término deve ser no formato 'HH:MM'.");
      return;
    }


    const alocacao: CreateAlocacao = {
      diaSemanaId: this.diaSemanaSelecionado!.id as number,
      atividadeId: this.atividadeSelecionada!.id as number,
      turmaId: this.turmaSelecionada!.id as number,
      horaInicio: this.horarioInicio as string,
      horaFim: this.horarioFim as string,
    };

    console.log(alocacao);


    this.alocacaoService.atualizarAlocacao(alocacao, this.id!).subscribe({
      next: () => {
        this.notificacaoService.success("Cadastro atualizado com sucesso.");
        this.router.navigate(["/alocacoes"]);
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

}
