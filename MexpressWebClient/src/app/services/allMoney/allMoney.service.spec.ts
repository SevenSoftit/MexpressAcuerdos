import { TestBed } from '@angular/core/testing';

import { AllGroupService } from './allGroup.service';

describe('AllGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllGroupService = TestBed.get(AllGroupService);
    expect(service).toBeTruthy();
  });
});
