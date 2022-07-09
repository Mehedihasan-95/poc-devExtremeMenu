import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResetCode, User, UserInfo } from '../models/Users';
const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getCreatedUser(crateUser: User) {
    var Controller = APIEndpoint + 'User';
    let body = JSON.stringify(crateUser);
    return this.httpClient.post<any>(Controller, body);
  }

  getAllUsers() {
    return this.httpClient.get<User[]>(APIEndpoint + 'User/GetAll');
  }

  //======================== USER_INFO SERVICE START ==============================

  getAllUserInfos() {
    return this.httpClient.get<UserInfo[]>(APIEndpoint + 'UserInfo/GetAll');
  }

  getUserInfoById(id: number) {
    let queryParams = new HttpParams().append('id', id);
    return this.httpClient.get<UserInfo>(APIEndpoint + 'UserInfo/GetById', { params: queryParams });
  }

  getUserInfoByUserId(id: number) {
    let queryParams = new HttpParams().append('id', id);
    return this.httpClient.get<UserInfo>(APIEndpoint + 'UserInfo/GetByUserId', { params: queryParams });
  }

  createUserInfo(userInfo: UserInfo) {
    return this.httpClient.post<UserInfo>(APIEndpoint + 'UserInfo', userInfo);
  }

  updateUserInfo(userInfo: UserInfo) {
    return this.httpClient.put<UserInfo>(APIEndpoint + 'UserInfo', userInfo);
  }

  deleteUser(id: number) {
    let queryParams = new HttpParams().append('id', id);
    return this.httpClient.delete<User>(APIEndpoint + 'User', { params: queryParams });
  }
  //======================== USER_INFO SERVICE END ================================

  //======================== USER PASSWORD RESET SERVICE START ================================

  getResetCode(email: string) {
    let queryParams = new HttpParams().append('recipant', email);
    return this.httpClient.get<UserInfo>(APIEndpoint + 'User/GetResetCode', { params: queryParams });
  }

  verifyResetCode(email: string, code: string) {
    let queryParams = new HttpParams()
      .append('email', email)
      .append('code', code);
    return this.httpClient.get<ResetCode>(APIEndpoint + 'User/VerifyResetCode', { params: queryParams });
  }

  resetPassword(resetCode: ResetCode) {
    return this.httpClient.post(APIEndpoint + 'User/ResetPassword', resetCode);
  }


  //======================== USER PASSWORD RESET SERVICE END ========================

  //======================== FILE SERVICE START =====================================

  getFile(userId: number, Ref: string) {
    let queryParams = new HttpParams()
      .append('UserId', userId)
      .append('Ref', Ref);
    return this.httpClient.get<any>(APIEndpoint + 'File/GetFile', { params: queryParams });
  }

  uploadFile(file: File, userId: number, Ref: string) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId.toString());
    formData.append('Ref', Ref);
    return this.httpClient.post(APIEndpoint + 'File/Upload', formData);
  }
  //======================== FILE SERVICE START =====================================




}
