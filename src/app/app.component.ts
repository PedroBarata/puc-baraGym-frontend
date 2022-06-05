import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'puc-baraGym-frontend';
  router: Router;
  
  constructor(private _router: Router) {
    this.router = _router;
   }

}
