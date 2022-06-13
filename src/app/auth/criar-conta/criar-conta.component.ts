import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.scss']
})
export class CriarContaComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  onCriarConta(form: NgForm) {

   console.log( form);


    if (form.invalid) {
      return;
    }
    this.authService.criarUsuario(form.value.nome, form.value.email, form.value.senha);
  }


}
