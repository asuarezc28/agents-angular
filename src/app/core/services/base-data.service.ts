import { inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { defer, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface SourceOptions<T> {
  mockRequest: () => Observable<T>;
  apiRequest: () => Observable<T>;
}

type HeaderEntry = Record<string, string>;

export abstract class BaseDataService {
  protected readonly http = inject(HttpClient);

  protected apiDelete<T>(path: string, customHeaders: HeaderEntry[] = []): Observable<T> {
    return this.http.delete<T>(this.apiUrl(path), this.buildHttpHeaders(customHeaders));
  }

  protected apiGet<T>(path: string, customHeaders: HeaderEntry[] = []): Observable<T> {
    return this.http.get<T>(this.apiUrl(path), this.buildHttpHeaders(customHeaders));
  }

  protected apiGetResponse<T>(
    path: string,
    customHeaders: HeaderEntry[] = [],
  ): Observable<HttpResponse<T>> {
    return this.http.get<T>(this.apiUrl(path), {
      headers: this.buildHttpHeaders(customHeaders).headers,
      observe: 'response',
    });
  }

  protected apiGetText(
    path: string,
    customHeaders: HeaderEntry[] = [],
  ): Observable<HttpResponse<string>> {
    return this.http.get(this.apiUrl(path), {
      headers: this.buildHttpHeadersText(customHeaders).headers,
      observe: 'response',
      responseType: 'text',
    });
  }

  protected apiPost<T>(
    path: string,
    body: unknown,
    customHeaders: HeaderEntry[] = [],
  ): Observable<T> {
    return this.http.post<T>(this.apiUrl(path), JSON.stringify(body), this.buildHttpHeaders(customHeaders));
  }

  protected apiPut<T>(
    path: string,
    body: unknown,
    customHeaders: HeaderEntry[] = [],
  ): Observable<T> {
    return this.http.put<T>(this.apiUrl(path), JSON.stringify(body), this.buildHttpHeaders(customHeaders));
  }

  protected simulateMockResponse<T>(
    data: T,
    minDelayMs = 200,
    maxDelayMs = 700,
  ): Observable<T> {
    const randomDelay = Math.floor(Math.random() * (maxDelayMs - minDelayMs + 1)) + minDelayMs;
    return of(data).pipe(delay(randomDelay));
  }

  protected fromMockOrApi<T>({ mockRequest, apiRequest }: SourceOptions<T>): Observable<T> {
    return defer(() => {
      if (environment.useMocks) {
        return mockRequest();
      }

      return apiRequest();
    });
  }

  protected apiUrl(path: string): string {
    return `${environment.apiBaseUrl}${path}`;
  }

  protected buildHttpHeaders(customHeaders: HeaderEntry[] = []): { headers: HttpHeaders } {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    for (const headerEntry of customHeaders) {
      for (const [key, value] of Object.entries(headerEntry)) {
        headers = headers.set(key, value);
      }
    }

    return { headers };
  }

  protected buildHttpHeadersText(customHeaders: HeaderEntry[] = []): { headers: HttpHeaders } {
    let headers = new HttpHeaders({
      'Content-Type': 'text/plain',
    });

    for (const headerEntry of customHeaders) {
      for (const [key, value] of Object.entries(headerEntry)) {
        headers = headers.set(key, value);
      }
    }

    return { headers };
  }
}