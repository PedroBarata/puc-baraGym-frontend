import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JwtConstants } from 'src/app/common/constants/jwt-constants';
import { Page } from 'src/app/model/page.model';
import { UsuarioAlocacaoAgendamento } from 'src/app/model/usuario-alocacao-agendamento.model';
import { UsuarioAtividade } from 'src/app/model/usuario-atividade.model';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { AtividadeService } from 'src/app/services/atividade.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';

@Component({
  selector: 'app-create-agendamento',
  templateUrl: './create-agendamento.component.html',
  styleUrls: ['./create-agendamento.component.scss']
})
export class CreateAgendamentoComponent implements OnInit {

  /* Primeira parte da combo */
  usuarioAtividades: UsuarioAtividade[] = [];
  atividadeSelecionada: UsuarioAtividade | null = null;

  countAlocacoes = 0;

  /* Página */
  paginacaoList: Page<UsuarioAlocacaoAgendamento> = new Page<UsuarioAlocacaoAgendamento>();
  paginasTotais: Array<number> = [];
  subscription: Subscription = new Subscription();

  paginasVisitadas: Array<number> = [0];
  conteudoTotal: UsuarioAlocacaoAgendamento[] = [];
  paginaAtual: number = -1;
  registrosPorPagina: number = 10;

  constructor(
    private atividadeService: AtividadeService,
    private agendamentoService: AgendamentoService,
    private notificacaoService: NotificacaoService
  ) { }

  ngOnInit(): void {
    this.atividadeService.obterAtividadesDoUsuario(localStorage.getItem(JwtConstants.VAR_MATRICULA) as string)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.usuarioAtividades = response;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  onSelecionarAtividade(usuarioAtividadeSelecionada: UsuarioAtividade) {
    this.atividadeSelecionada = usuarioAtividadeSelecionada;

    this.subscription = this.atividadeService.obterAlocacoesEAgendamentosDoUsuario(
      localStorage.getItem(JwtConstants.VAR_MATRICULA) as string,
      this.atividadeSelecionada!.id,
      {page: 0, pageSize: this.registrosPorPagina}).subscribe({
        next: (response) => {
          this.paginacaoList = response;
          this.conteudoTotal = response.content;
          this.paginaAtual = 0;

          this.paginasTotais = Array(response.totalPages).fill(0).map((_, i) => i);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  onAlterarAgendamento(alocacao: UsuarioAlocacaoAgendamento) {
    console.log(alocacao);
    if (alocacao.estaAgendado) {
      return this.removeAgendamento(alocacao);
    }


    if (this.atividadeSelecionada?.quantidadeSemana! === this.countAlocacoes) {
      this.notificacaoService.warn("Você não pode exceder o limite semanal da atividade.");
      return;
    }

    return this.fazAgendamento(alocacao);
  }

  fazAgendamento(alocacao: UsuarioAlocacaoAgendamento) {
    this.agendamentoService
      .cadastrarAgendamentoPorAlocacao(
        localStorage.getItem(JwtConstants.VAR_MATRICULA) as string,
        alocacao.alocacaoId)
      .subscribe({
        next: (response) => {
          console.log(response);
          alocacao.estaAgendado = true;
          this.countAlocacoes++;
          alocacao.agendamentoId = response.id;
          this.notificacaoService.success("Agendamento feito com sucesso.");
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  removeAgendamento(alocacao: UsuarioAlocacaoAgendamento) {
    this.agendamentoService
      .removerAgendamento(
        localStorage.getItem(JwtConstants.VAR_MATRICULA) as string,
        alocacao.agendamentoId)
      .subscribe({
        next: (response) => {
          console.log(response);
          alocacao.estaAgendado = false;
          this.countAlocacoes--;
          this.notificacaoService.success("Agendamento removido com sucesso.");
        },
        error: (err) => {
          console.error(err);
        }
      });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  onProximaPagina() {

    if (this._paginaAtualEhAUltima()) {
      return;
    }

    const proxPagina = this.paginaAtual + 1;

    if (this.paginasVisitadas.find(e => e === proxPagina) !== undefined) {
      this._carregaEmMemoria(proxPagina);
      return;
    }

    this.subscription = this._obtemDadosServico(proxPagina);
  }

  onPaginaAnterior() {
    if (this._paginaAtualEhAPrimeira()) {
      return;
    }

    const paginaAnterior = this.paginaAtual - 1;
    if (this.paginasVisitadas.find(e => e === paginaAnterior) !== undefined) {
      this._carregaEmMemoria(paginaAnterior);
      return;
    }

    this.subscription = this._obtemDadosServico(paginaAnterior);
  }

  onPage(page: number) {
    this.paginaAtual = page;

    if (this.paginasVisitadas.find(e => e === page) !== undefined) {
      this._carregaEmMemoria(page);
      return;
    }

    this.subscription = this._obtemDadosServico(page);
  }


  private _obtemElementosDaPaginaAtual(page: number, pageSize: number, array: Array<any>) {
    const offSet = page * pageSize;

    const response = array.slice(offSet, offSet + pageSize);

    /* Se for a ultima pagina, pega o array de trás pra frente */
    if (response.length === 0) {
      return array.slice(-pageSize);
    }
    return response;

  }

  private _paginaAtualEhAUltima() {
    return (this.paginaAtual === this.paginasTotais.length - 1);
  }

  private _paginaAtualEhAPrimeira() {
    return this.paginaAtual === 0;
  }

  private _carregaEmMemoria(pagina: number) {
    this.paginacaoList.content = this._obtemElementosDaPaginaAtual(pagina, this.registrosPorPagina, this.conteudoTotal);
    this.paginaAtual = pagina;
  }

  private _obtemDadosServico(pagina: number) {
    return this.atividadeService.obterAlocacoesEAgendamentosDoUsuario(
        localStorage.getItem(JwtConstants.VAR_MATRICULA) as string,
        this.atividadeSelecionada!.id,
        {page: pagina, pageSize: this.registrosPorPagina}).subscribe({
          next: (response) => {
            this.paginasVisitadas.push(pagina);
            this.conteudoTotal.push(...response.content);
            this.conteudoTotal.sort((a, b) => a.alocacaoId! - b.alocacaoId!);
            this.paginacaoList = response;
            this.paginaAtual = pagina;
          },
          error: (err) => {
            console.error(err);
          }
        });
  }
}
