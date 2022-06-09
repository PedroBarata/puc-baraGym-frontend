import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAgendamentoComponent } from './list-agendamento.component';

describe('AgendamentosComponent', () => {
  let component: ListAgendamentoComponent;
  let fixture: ComponentFixture<ListAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAgendamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
