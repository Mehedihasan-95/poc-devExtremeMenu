import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserSessionStoreService as StoreService } from './user-session-store.service'
import { environment } from '../../environments/environment';
import { LoginUser, User } from '../models/Users';
const APIEndpoint = environment.APIEndpoint;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private storeService: StoreService) { }

  getUserToken(user: LoginUser) {
    var Controller = APIEndpoint + 'token';
    let body = JSON.stringify(user);
    return this.httpClient.post<any>(Controller, body);
  }

  getActiveUser(id: number) {
    return this.httpClient.get<User>
      (APIEndpoint + 'User/GetById', { params: new HttpParams().append("id", id) });
  }
}
