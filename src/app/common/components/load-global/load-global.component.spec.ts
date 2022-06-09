import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadGlobalComponent } from './load-global.component';

describe('LoadGlobalComponent', () => {
  let component: LoadGlobalComponent;
  let fixture: ComponentFixture<LoadGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
