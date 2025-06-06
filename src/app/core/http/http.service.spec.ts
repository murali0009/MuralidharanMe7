import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, HttpInterceptor, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { HttpService } from './http.service';
import { HttpCacheService } from './http-cache.service';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { CacheInterceptor } from './cache.interceptor';
import { ApiPrefixInterceptor } from './api-prefix.interceptor';

describe('HttpService', () => {
  let httpCacheService: HttpCacheService;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        ErrorHandlerInterceptor,
        CacheInterceptor,
        ApiPrefixInterceptor,
        HttpCacheService,
        {
            provide: HttpClient,
            useClass: HttpService
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
  });

  beforeEach(inject(
    [HttpClient, HttpTestingController, HttpCacheService],
    (_http: HttpClient, _httpMock: HttpTestingController, _httpCacheService: HttpCacheService) => {
      http = _http;
      httpMock = _httpMock;
      httpCacheService = _httpCacheService;
    }
  ));

  afterEach(() => {
    httpCacheService.cleanCache();
    httpMock.verify();
  });

  // it('should use error handler, API prefix and no cache by default', () => {
  //   // Arrange
  //   let interceptors: HttpInterceptor[];
  //   const realRequest = http.request;
  //   spyOn(HttpService.prototype, 'request').and.callFake(function(this: any) {
  //     interceptors = this.interceptors;
  //     return realRequest.apply(this, arguments);
  //   });

  //   // Act
  //   const request = http.get('/toto');

  //   // Assert
  //   request.subscribe(() => {
  //     expect(http.request).toHaveBeenCalled();
  //     expect(interceptors.some(i => i instanceof ApiPrefixInterceptor)).toBeTruthy();
  //     expect(interceptors.some(i => i instanceof ErrorHandlerInterceptor)).toBeTruthy();
  //     expect(interceptors.some(i => i instanceof CacheInterceptor)).toBeFalsy();
  //   });
  //   httpMock.expectOne({}).flush({});
  // });
});
