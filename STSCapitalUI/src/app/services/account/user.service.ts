import { Injectable } from '@angular/core';
import { HttpLocalClient } from '../http-local-client.service';
import { IUser } from 'src/app/modules/core/models/user';
import { UserUrl } from '../service-url.model';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private httpLocalClient: HttpLocalClient) {}
  createUser(user: IUser): Observable<any> {
    try {
      return this.httpLocalClient.post(UserUrl.postUser, user);
    } catch (e) {
      throw e;
    }
  }
}
