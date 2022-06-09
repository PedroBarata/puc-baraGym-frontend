import { Component, OnInit } from '@angular/core';
import { JwtConstants } from 'src/app/common/constants/jwt-constants';
import { Page } from 'src/app/model/page.model';
import { UsuarioAgendamento } from 'src/app/model/usuario-agendamento.model';
import { AgendamentoService } from 'src/app/services/agendamento.service';

@Component({
  selector: 'app-list-agendamento',
  templateUrl: './list-agendamento.component.html',
  styleUrls: ['./list-agendamento.component.scss']
})
export class ListAgendamentoComponent implements OnInit {

  agendamentos: Page<UsuarioAgendamento> = new Page<UsuarioAgendamento>();
  agendamentoIndex: number = 0;
  constructor(private agendamentoService: AgendamentoService) { }

  ngOnInit(): void {
    this.agendamentoService.obterAgendamentosDoUsuario(
      localStorage.getItem(JwtConstants.VAR_MATRICULA) as string,
    ).subscribe({
      next: (response) => {
        console.log(response);
        this.agendamentos = response;
      }
      ,
      error: (err) => {
        console.error(err);
      }
    })
  }

  onPrevCarousel() {
    if (this.agendamentos.last) {
      return;
    }

    this.agendamentoService.obterAgendamentosDoUsuario(
      localStorage.getItem(JwtConstants.VAR_MATRICULA) as string,
      { page: this.agendamentoIndex, pageSize: 2 }
    ).subscribe({
      next: (response) => {
        this.agendamentos.content.push(...response.content);
        this.agendamentos = {
          ...response,
          content: this.agendamentos.content,
          numberOfElements: this.agendamentos.numberOfElements += response.numberOfElements
        }

        this.agendamentoIndex++;
      }
      ,
      error: (err) => {
        console.error(err);
      }
    })
  }

  onNextCarousel() {
    if (this.agendamentos.last) {
      return;
    }

    this.agendamentoService.obterAgendamentosDoUsuario(
      localStorage.getItem(JwtConstants.VAR_MATRICULA) as string,
      { page: this.agendamentoIndex, pageSize: 2 }
    ).subscribe({
      next: (response) => {
         this.agendamentos.content.push(...response.content);
        this.agendamentos = {
          ...response,
          content: this.agendamentos.content,
          numberOfElements: this.agendamentos.numberOfElements += response.numberOfElements
        }

        this.agendamentoIndex++;
      }
      ,
      error: (err) => {
        console.error(err);
      }
    })
  }

}
