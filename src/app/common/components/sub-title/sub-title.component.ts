import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-title',
  templateUrl: './sub-title.component.html',
  styleUrls: ['./sub-title.component.scss']
})
export class SubTitleComponent implements OnInit {

  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() linkVoltar: string = '';
  @Input() isVoltar: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
