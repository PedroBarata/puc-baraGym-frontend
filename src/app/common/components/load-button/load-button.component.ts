import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.scss']
})
export class LoadButtonComponent implements OnInit {
  @Input() label: string = '';
  @Input() form: NgForm | null = null;
  isLoading = this.loadingService.isLoading;


  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
  }


}
