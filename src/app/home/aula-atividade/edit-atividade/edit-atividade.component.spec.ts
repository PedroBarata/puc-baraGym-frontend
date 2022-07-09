import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAtividadeComponent } from './edit-atividade.component';

describe('EditAtividadeComponent', () => {
  let component: EditAtividadeComponent;
  let fixture: ComponentFixture<EditAtividadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAtividadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
