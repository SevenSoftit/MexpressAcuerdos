import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementConciliationDetailComponent } from './agreement-conciliation-detail.component';

describe('AgreementConciliationDetailComponent', () => {
  let component: AgreementConciliationDetailComponent;
  let fixture: ComponentFixture<AgreementConciliationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementConciliationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementConciliationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
