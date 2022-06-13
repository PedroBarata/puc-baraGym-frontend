import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiaSemana, diaSemanaList } from 'src/app/common/constants/dia-semana.constants';
import { CreateAlocacao } from 'src/app/model/alocacao.model';
import { Atividade } from 'src/app/model/atividade.model';
import { Turma } from 'src/app/model/turma.model';
import { AlocacaoService } from 'src/app/services/alocacao.service';
import { AtividadeService } from 'src/app/services/atividade.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-create-alocacao',
  templateUrl: './create-alocacao.component.html',
  styleUrls: ['./create-alocacao.component.scss']
})
export class CreateAlocacaoComponent implements OnInit {

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
    private alocacaoService: AlocacaoService,
    private atividadeService: AtividadeService,
    private turmaService: TurmaService,
    private notificacaoService: NotificacaoService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.loadAtividades();
    this.loadTumas();
  }

  onCriarAlocacao() {
    if(!this.validaDropdown()) {
      this.notificacaoService.warn("Selecione turma, atividade/aula e dia da semana.");
      return;
    }

    if(!this.validaHorario()) {
      this.notificacaoService.warn("O horário de início e de término deve ser no formato 'HH:MM'.");
      return;
    }


    const alocacao: CreateAlocacao = {
      diaSemanaId: this.diaSemanaSelecionado!.id as number,
      atividadeId: this.atividadeSelecionada!.id as number,
      turmaId: this.turmaSelecionada!.id as number,
      horaInicio: this.horarioInicio as string,
      horaFim: this.horarioFim as string
     };

    this.alocacaoService.cadastrarAlocacao(alocacao).subscribe({
      next: () => {
        this.notificacaoService.success("Cadastro realizado com sucesso.");
        this.router.navigate(["/alocacoes"]);
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  loadAtividades() {
    this.atividadeService.obterTodasAtividades({ page: 0, pageSize: 1000 }).subscribe({
      next: (response) => {
        this.atividades = response.content;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadTumas() {
    this.turmaService.obterTurmas({ page: 0, pageSize: 1000 }).subscribe({
      next: (response) => {
        this.turmas = response.content;
      },
      error: (err) => {
        console.error(err);
      }
    });
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

    if (!this.horarioInicio || !this.horarioInicio.match(CreateAlocacaoComponent.TIME_REGEX) ||
      !this.horarioFim || !this.horarioFim.match(CreateAlocacaoComponent.TIME_REGEX)) {
      return false;
    }
    return true;
  }

}
