import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.scss']
})
export class LoadButtonComponent implements OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() form: NgForm | null = null;
  isLoading: boolean = false;


  loadSubscription: Subscription = new Subscription;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadSubscription = this.loadingService.onLoading()
      .subscribe(isLoading => {
        this.isLoading = isLoading;
      })
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.loadSubscription.unsubscribe();
  }

}
