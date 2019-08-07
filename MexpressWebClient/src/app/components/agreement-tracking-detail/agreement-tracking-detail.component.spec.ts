import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementTrackingDetailComponent } from './agreement-tracking-detail.component';

describe('AgreementTrackingDetailComponent', () => {
  let component: AgreementTrackingDetailComponent;
  let fixture: ComponentFixture<AgreementTrackingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementTrackingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementTrackingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
