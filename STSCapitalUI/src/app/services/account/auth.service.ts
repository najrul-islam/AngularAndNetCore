import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { RefreshTokenService } from './refresh-token.service';
import { GetAccessToken, LOCALSTORAGE_KEY } from 'src/app/models/localstorage-item';
import { HttpLocalClient } from '../http-local-client.service';

@Injectable()
export class AuthService {
  constructor(
    private refreshTokenService: RefreshTokenService,
    private http: HttpClient,
    private httpLocalClient: HttpLocalClient,
    private router: Router
  ) { }

  base_url = environment.client.base_url;
  login(user): Observable<any> {
    const loginPost = {
      username: user.email,
      password: user.password,
      grant_type: 'password'
    };
    return this.http.post(this.base_url + '/token', loginPost).pipe(
      map(result => {
        this.setToken(result);
        return result;
      })
    );
  }

  setToken(result): void {
    if (result && result.statusCode === 200 && result.access_token) {
      localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, JSON.stringify(result));
      this.httpLocalClient.setTokenAndHeader();
    }
  }

  refreshToken(): Observable<any> {
    const user = GetAccessToken();
    if (!user) {
      return;
    }
    const data = {
      grant_type: 'refresh_token',
      refreshtoken: user.access_token
    };
    return this.http.post(this.base_url + '/token', data).pipe(
      tap(result => {
        this.refreshTokenService.setToken(result);
        location.reload();
        return result || {};
      })
    );
  }
  logout(): void {
    this.clearLocalStorage();
  }

  isLoggedIn(): boolean {
    try {
      const user = GetAccessToken();
      if (!user) {
        return false;
      } else {
        return true;
      }
    } catch (e) { }
  }
  clearLocalStorage(): void {
    localStorage.clear();
  }
}
