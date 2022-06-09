import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtConstants } from 'src/app/common/constants/jwt-constants';
import { UsuarioAtvidade } from 'src/app/model/usuario-atividade.model';
import { AtividadeService } from 'src/app/services/atividade.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-list-plano',
  templateUrl: './list-plano.component.html',
  styleUrls: ['./list-plano.component.scss']
})
export class ListPlanoComponent implements OnInit {

  constructor(
    private atividadeService: AtividadeService,
    private router: Router,
    private loadingService: LoadingService
    ) { }
  atividadesDoPlano: UsuarioAtvidade[] = [];

  ngOnInit(): void {
    this.atividadeService
      .obterAtividadesDoUsuario(localStorage.getItem(JwtConstants.VAR_MATRICULA) as string).subscribe({
        next: (response) => {
          console.log(response);
          this.atividadesDoPlano = response;
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

}
