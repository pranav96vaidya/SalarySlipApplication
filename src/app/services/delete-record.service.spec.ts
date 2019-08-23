import { TestBed } from '@angular/core/testing';

import { DeleteRecordService } from './delete-record.service';

describe('DeleteRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteRecordService = TestBed.get(DeleteRecordService);
    expect(service).toBeTruthy();
  });
});
