import { Injectable } from '@angular/core';
import { LOCALSTORAGE_KEY } from 'src/app/models/localstorage-item';
import { GlobalEmitterService } from '../global-emitter.service';

@Injectable()
export class RefreshTokenService {

  constructor(private globalEmitterService: GlobalEmitterService) { }
  setToken(result): void {
    localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, JSON.stringify(result));
    this.globalEmitterService.sendRefreshToken(result);
  }
  logOut(): void {
    this.globalEmitterService.sendLogOut(true);
  }
}
