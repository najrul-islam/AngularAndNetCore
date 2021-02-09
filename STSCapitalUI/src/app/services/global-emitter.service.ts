import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GlobalEmitterService {
  emitRefreshToken: EventEmitter<any>;
  emitLogOut: EventEmitter<any>;
  constructor() {
    this.emitRefreshToken = new EventEmitter<any>();
    this.emitLogOut = new EventEmitter<any>();
  }

  sendRefreshToken(data): void {
    this.emitRefreshToken.emit(data);
  }
  sendLogOut(data): void {
    this.emitLogOut.emit(data);
  }
}
