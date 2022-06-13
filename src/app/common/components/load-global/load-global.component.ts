import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-load-global',
  templateUrl: './load-global.component.html',
  styleUrls: ['./load-global.component.scss']
})
export class LoadGlobalComponent implements OnInit {

  isLoading: Subject<boolean> = this.loadingService.isLoading;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
  }

}
