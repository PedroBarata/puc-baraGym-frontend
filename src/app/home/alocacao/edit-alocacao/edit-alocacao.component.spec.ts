import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAlocacaoComponent } from './edit-alocacao.component';

describe('GetAlocacaoComponent', () => {
  let component: GetAlocacaoComponent;
  let fixture: ComponentFixture<GetAlocacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAlocacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAlocacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
