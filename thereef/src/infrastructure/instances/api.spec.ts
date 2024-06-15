import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { ApiService } from './api';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve data via GET', () => {
    const dummyData = { id: 1, name: 'John' };
    const url = '/data';
    const fullUrl = environment.apiUrl + url;

    service.get<any>(url).subscribe((data: any) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(fullUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should handle error response', () => {
    const url = '/data';
    const fullUrl = environment.apiUrl + url;
    const errorMessage = '404 Not Found';

    service.get<any>(url).subscribe(
      () => fail('should have failed with the 404 error'),
      (error: any) => {
        expect(error.status).toEqual(404);
        expect(error.statusText).toEqual('Not Found');
      }
    );

    const req = httpMock.expectOne(fullUrl);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
