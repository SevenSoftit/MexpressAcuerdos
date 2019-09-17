import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAgreementEvidenceModalComponent } from './add-agreement-evidence-modal.component';

describe('AddAgreementEvidenceModalComponent', () => {
  let component: AddAgreementEvidenceModalComponent;
  let fixture: ComponentFixture<AddAgreementEvidenceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAgreementEvidenceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAgreementEvidenceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
