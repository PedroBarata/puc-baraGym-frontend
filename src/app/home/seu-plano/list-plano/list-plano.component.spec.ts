import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPlanoComponent } from './list-plano.component';


describe('ListPlanoComponent', () => {
  let component: ListPlanoComponent;
  let fixture: ComponentFixture<ListPlanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPlanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
