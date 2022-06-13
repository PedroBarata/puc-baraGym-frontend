import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlocacaoComponent } from './create-alocacao.component';

describe('CreateAlocacaoComponent', () => {
  let component: CreateAlocacaoComponent;
  let fixture: ComponentFixture<CreateAlocacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAlocacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlocacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
