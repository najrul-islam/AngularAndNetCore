import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GlobalEmitterService } from './global-emitter.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from './localstorage/localstorage.service';
import { GetAccessToken } from '../models/localstorage-item';

@Injectable({
  providedIn: 'root'
})
export class HttpLocalClient {
  public BASE_URL: string;
  token: string;
  headers;
  constructor(
    private globalEmitterService: GlobalEmitterService,
    public http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.BASE_URL = environment.client.base_url;
    this.setTokenAndHeader();
    this.globalEmitterService.emitRefreshToken.subscribe(res => {
      this.setTokenAndHeader();
    });
  }

  setToken(): any {
    const user = GetAccessToken();
    if (user) {
      try {
        this.token = user.access_token;
      }
      catch (error) {
        this.localStorageService.clearAllLocalStorageKeyAndValue();
        this.router.navigate(['/login']);
      }
    } else {
      this.localStorageService.clearAllLocalStorageKeyAndValue();
      this.router.navigate(['/login']);
    }
  }

  setTokenAndHeader(): any {
    const user = GetAccessToken();
    if (user) {
      try {
        this.token = user.access_token;
        this.createAuthorizationHeaders();
      }
      catch (error) {
        this.localStorageService.clearAllLocalStorageKeyAndValue();
        this.router.navigate(['/login']);
      }
    }
  }

  createAuthorizationHeaders(): any {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'bearer ' + this.token);
    this.headers = { headers };
  }

  get(url: string): any {
    return this.http.get(this.BASE_URL + url, this.getHeaders());
  }

  post(url: string, data: any): any {
    return this.http.post(this.BASE_URL + url, data, this.headers);
  }
  postJson(url: string, data: any, token = ''): any {
    return this.http.post(this.BASE_URL + url + '?', data, this.getHeaders());
  }
  put(url: string, data: any): any{
    return this.http.put(this.BASE_URL + url, data, this.getHeaders());
  }

  delete(url: string, data?: any): any {
    const options = {
      ...this.getHeaders(),
      body: data
    };
    return this.http.delete(this.BASE_URL + url, options);
  }

  getHeaders(): any {
    this.setToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.token
    });

    return { headers };
  }

  /** generic type of Get request @param url */
  getT<T>(url: string): any {
    return this.http.get<T>(this.BASE_URL + url, this.getHeaders());
  }

  getUnAuthorized(url): any {
    return this.http.get(this.BASE_URL + url, this.headers);
  }
}
