import { TestBed } from '@angular/core/testing';
import { TypeOfAgreementService } from './typeOfAgreement.service';



describe('TypeOfAgreementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeOfAgreementService = TestBed.get(TypeOfAgreementService);
    expect(service).toBeTruthy();
  });
});
