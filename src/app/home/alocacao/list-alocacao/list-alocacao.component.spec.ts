import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlocacaoComponent } from './list-alocacao.component';

describe('ListAlocacaoComponent', () => {
  let component: ListAlocacaoComponent;
  let fixture: ComponentFixture<ListAlocacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAlocacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAlocacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
