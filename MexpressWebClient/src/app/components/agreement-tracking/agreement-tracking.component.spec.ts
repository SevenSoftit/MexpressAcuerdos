import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgreementTrackingComponent } from './agreement-tracking.component';


describe('AgreementTrackingComponent', () => {
  let component: AgreementTrackingComponent;
  let fixture: ComponentFixture<AgreementTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
