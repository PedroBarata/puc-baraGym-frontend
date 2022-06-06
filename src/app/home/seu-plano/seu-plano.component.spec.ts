import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeuPlanoComponent } from './seu-plano.component';

describe('SeuPlanoComponent', () => {
  let component: SeuPlanoComponent;
  let fixture: ComponentFixture<SeuPlanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeuPlanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeuPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
