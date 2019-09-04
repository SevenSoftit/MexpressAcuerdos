import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgreementConciliationComponent } from './agreement-conciliation.component';


describe('AgreementConciliationComponent', () => {
  let component: AgreementConciliationComponent;
  let fixture: ComponentFixture<AgreementConciliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementConciliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementConciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
