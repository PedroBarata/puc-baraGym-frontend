import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAtividadeComponent } from './create-atividade.component';

describe('CreateAtividadeComponent', () => {
  let component: CreateAtividadeComponent;
  let fixture: ComponentFixture<CreateAtividadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAtividadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
