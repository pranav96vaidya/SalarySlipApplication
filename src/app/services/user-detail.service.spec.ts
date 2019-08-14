import { TestBed } from '@angular/core/testing';

import { UserDetailService } from './user-detail.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserDetailService', () => {
  let service: UserDetailService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    service = TestBed.get(UserDetailService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
