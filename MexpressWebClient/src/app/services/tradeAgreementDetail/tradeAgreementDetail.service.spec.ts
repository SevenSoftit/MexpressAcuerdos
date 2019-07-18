import { TestBed } from '@angular/core/testing';
import { TradeAgreementDetailService } from './tradeAgreementDetail.service';


describe('TradeAgreementDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TradeAgreementDetailService = TestBed.get(TradeAgreementDetailService);
    expect(service).toBeTruthy();
  });
});
