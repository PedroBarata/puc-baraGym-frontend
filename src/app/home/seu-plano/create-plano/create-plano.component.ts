import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Atividade } from 'src/app/model/atividade.model';
import { Page } from 'src/app/model/page.model';
import { AtividadeService } from 'src/app/services/atividade.service';
import { NotificationService } from 'src/app/services/notification.service';

interface AtividadeSelecionada {
  atividadeId: number,
  nome: string,
  quantidadeSemana: number
};

@Component({
  selector: 'app-create-plano',
  templateUrl: './create-plano.component.html',
  styleUrls: ['./create-plano.component.scss']
})
export class CreatePlanoComponent implements OnInit {

  atividades: Page<Atividade> = new Page<Atividade>();
  valorTotal: number = 0;

  atividadesSelecionadas: AtividadeSelecionada[] | undefined;


  constructor(private atividadeService: AtividadeService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.atividadesSelecionadas = [];

    this.atividadeService.obterTodasAtividades(0, 2).subscribe({
      next: (response) => {
        console.log(response);

        this.atividades = response;
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

    this.atividadesSelecionadas!.push(
      {
        atividadeId: atividade.id,
        nome: atividade.nome,
        quantidadeSemana: parseInt(qtdSemana)
      }
    );

    this.valorTotal = this.valorTotal + atividade.valorDia * parseInt(qtdSemana);
    console.log("digdon morre de ré", atividade);
  }

  onDeleteAtividadeSelecionada(atividadeSelecionada: any) {
    console.log(atividadeSelecionada);
    alert("Digdon morre de ré!");
  }

}
