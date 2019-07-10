import { TestBed } from '@angular/core/testing';

import { AllMoneyService } from './allMoney.service';

describe('AllMoneyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllMoneyService = TestBed.get(AllMoneyService);
    expect(service).toBeTruthy();
  });
});
