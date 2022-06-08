import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtConstants } from 'src/app/common/constants/jwt-constants';
import { UsuarioAtvidade } from 'src/app/model/usuario-atividade.model';
import { AtividadeService } from 'src/app/services/atividade.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-seu-plano',
  templateUrl: './seu-plano.component.html',
  styleUrls: ['./seu-plano.component.scss']
})
export class SeuPlanoComponent implements OnInit {

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

  onVerPlanos() {
    this.router.navigate(["/planos"]);
  }

}
