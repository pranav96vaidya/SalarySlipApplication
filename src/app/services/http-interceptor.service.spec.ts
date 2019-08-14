import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpInterceptorService } from './http-interceptor.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [ HttpInterceptorService ]
  }));

  it('should be created', () => {
    const service: HttpInterceptorService = TestBed.get(HttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
