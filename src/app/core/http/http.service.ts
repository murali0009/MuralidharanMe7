import { Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { CacheInterceptor } from './cache.interceptor';
import { ApiPrefixInterceptor } from './api-prefix.interceptor';

// HttpClient is declared in a re-exported module, so we have to extend the original module to make it work properly
// (see https://github.com/Microsoft/TypeScript/issues/13897)
// From @angular/common/http/src/interceptor: allows to chain interceptors
class HttpInterceptorHandler implements HttpHandler {
  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) {}

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(request, this.next);
  }
}

/**
 * Allows to override default dynamic interceptors that can be disabled with the HttpService extension.
 * Except for very specific needs, you should better configure these interceptors directly in the constructor below
 * for better readability.
 *
 * For static interceptors that should always be enabled (like ApiPrefixInterceptor), use the standard
 * HTTP_INTERCEPTORS token.
 */
export const HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>('HTTP_DYNAMIC_INTERCEPTORS');

/**
 * Extends HttpClient with per request configuration using dynamic interceptors.
 */
@Injectable()
export class HttpService {
  constructor(
    private httpHandler: HttpHandler,
    private injector: Injector,
    private HttpClient: HttpClient,
    @Optional() @Inject(HTTP_DYNAMIC_INTERCEPTORS) private interceptors: HttpInterceptor[] = []
  ) {
    if (!this.interceptors) {
      // Configure default interceptors that can be disabled here
      this.interceptors = [this.injector.get(ApiPrefixInterceptor), this.injector.get(ErrorHandlerInterceptor)];
    }
  }

  // Override the original method to wire interceptors when triggering the request.
  request(method?: any, url?: any, options?: any): any {
    const handler = this.interceptors.reduceRight(
      (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
      this.httpHandler
    );
    return this.HttpClient;
  }

  private removeInterceptor(interceptorType: Function): HttpService {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.HttpClient,
      this.interceptors.filter(i => !(i instanceof interceptorType))
    );
  }

  private addInterceptor(interceptor: HttpInterceptor): HttpService {
    return new HttpService(this.httpHandler, this.injector, this.HttpClient, this.interceptors.concat([interceptor]));
  }
}
