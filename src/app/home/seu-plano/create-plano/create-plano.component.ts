import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtConstants } from 'src/app/common/constants/jwt-constants';
import { Atividade } from 'src/app/model/atividade.model';
import { Page } from 'src/app/model/page.model';
import { CreateUsuarioAtividade } from 'src/app/model/usuario-atividade.model';
import { AtividadeService } from 'src/app/services/atividade.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';

interface AtividadeSelecionada {
  atividadeId: number,
  nome: string,
  quantidadeSemana: number,
  valorDia: number
};

@Component({
  selector: 'app-create-plano',
  templateUrl: './create-plano.component.html',
  styleUrls: ['./create-plano.component.scss']
})
export class CreatePlanoComponent implements OnInit {

  atividades: Page<Atividade> = new Page<Atividade>();
  valorTotal: number = 0;
  atividadeIndex: number =0;
  atividadesSelecionadas: AtividadeSelecionada[] = [];


  constructor(private atividadeService: AtividadeService,
    private notificationService: NotificacaoService,
    private router: Router) { }

  ngOnInit(): void {
    this.atividadesSelecionadas = [];

    this.atividadeService.obterTodasAtividades({page: this.atividadeIndex, pageSize: 2}).subscribe({
      next: (response) => {
        this.atividades = response;
        this.atividadeIndex++;
      },
      error: (err) => {
        console.error(err);

      }
    });

  }

  onAdicionarAtividade(atividade: Atividade, atividadeForm: NgForm) {
    console.log(atividadeForm);

    const achouElemento = this.atividadesSelecionadas!.find(el => el.atividadeId === atividade.id);
    const qtdSemana = atividadeForm.value.vezesNaSemana;
    if (achouElemento) {
      this.notificationService.warn(`A atividade '${achouElemento.nome}' já foi adicionada no seu resumo.`);
      return;
    }

    this.atividadesSelecionadas.push(
      {
        atividadeId: atividade.id!,
        nome: atividade.nome,
        quantidadeSemana: parseInt(qtdSemana),
        valorDia: atividade.valorDia
      }
    );

    this.valorTotal = this.valorTotal + atividade.valorDia * parseInt(qtdSemana);
    console.log("digdon morre de ré", atividade);
  }

  onPrevCarousel() {
    if(this.atividades.last) {
      return;
    }

    this.atividadeService.obterTodasAtividades({page: this.atividadeIndex, pageSize: 2}).subscribe({
      next: (response) => {
        this.atividades.content.push(...response.content);
        this.atividades = {
          ...response,
          content: this.atividades.content,
          numberOfElements: this.atividades.numberOfElements +=response.numberOfElements
        }
        this.atividadeIndex++;
      },
      error: (err) => {
        console.error(err);

      }
    });
  }

  onNextCarousel() {
    if(this.atividades.last) {
      return;
    }

    this.atividadeService.obterTodasAtividades({page: this.atividadeIndex, pageSize: 2}).subscribe({
      next: (response) => {
        this.atividades.content.push(...response.content);
        this.atividades = {
          ...response,
          content: this.atividades.content,
          numberOfElements: this.atividades.numberOfElements +=response.numberOfElements
        }
        this.atividadeIndex++;
      },
      error: (err) => {
        console.error(err);

      }
    });
    return;
  }

  onDeleteAtividadeSelecionada(atividadeSelecionada: AtividadeSelecionada) {
    const achouElemento = this.atividadesSelecionadas!.find(el => el.atividadeId === atividadeSelecionada.atividadeId);
    const indexElemento = this.atividadesSelecionadas!.indexOf(achouElemento!);
    this.atividadesSelecionadas!.splice(indexElemento, 1);
    console.log(atividadeSelecionada);
    this.valorTotal = this.valorTotal - atividadeSelecionada.valorDia * atividadeSelecionada.quantidadeSemana;
  }

  onFinalizarCompra() {
    if (!this.atividadesSelecionadas || this.atividadesSelecionadas?.length === 0) {
      this.notificationService.info(`Adicione atividades no seu resumo para prosseguir com a compra.`);
      return;
    }

    const array: any = this.atividadesSelecionadas!.map(function (atividade) {
      return {
        atividadeId: atividade.atividadeId,
        quantidadeSemana: atividade.quantidadeSemana
      }
    });
    console.log(array);

    const atividadesParaCompra: CreateUsuarioAtividade = {
      atividades: array,
      valorTotal: this.valorTotal
    }

    this.atividadeService
    .cadastrarUsuarioAtividade(localStorage.getItem(JwtConstants.VAR_MATRICULA) as string, atividadesParaCompra)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.notificationService.success("Compra realizada com sucesso.");
        this.router.navigate(["../"])
      },
      error: (err) => {
        console.error(err);

      }
    })
  }

}
