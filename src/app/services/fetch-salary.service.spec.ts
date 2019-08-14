import { TestBed } from '@angular/core/testing';

import { FetchSalaryService } from './fetch-salary.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FetchSalaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: FetchSalaryService = TestBed.get(FetchSalaryService);
    expect(service).toBeTruthy();
  });
});
