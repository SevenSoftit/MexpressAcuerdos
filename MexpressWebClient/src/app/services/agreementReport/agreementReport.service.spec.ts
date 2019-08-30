import { TestBed } from '@angular/core/testing';

import { AgreementReportService } from './agreementReport.service';

describe('AgreementReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgreementReportService = TestBed.get(AgreementReportService);
    expect(service).toBeTruthy();
  });
});
