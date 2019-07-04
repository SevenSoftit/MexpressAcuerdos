import { TestBed } from '@angular/core/testing';

import { DashboardResumeService } from './dashboardResume.service';

describe('DashboardResumeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardResumeService = TestBed.get(DashboardResumeService);
    expect(service).toBeTruthy();
  });
});
