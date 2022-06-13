import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAulaAtividadeComponent } from './list-aula-atividade.component';

describe('ListAulaAtividadeComponent', () => {
  let component: ListAulaAtividadeComponent;
  let fixture: ComponentFixture<ListAulaAtividadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAulaAtividadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAulaAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
