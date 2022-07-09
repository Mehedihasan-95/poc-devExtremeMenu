import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../models/Users';
import { StoreKeys } from "./store-keys";

@Injectable({
  providedIn: 'root'
})
export class UserSessionStoreService {

  constructor(@Inject(SESSION_STORAGE) private readonly store: StorageService) { }

  public saveAccessToken(token: string): boolean {
    this.store.set(StoreKeys.ACCESS_TOKEN_KEY, token);
    return true;
  }

  public getAccessToken(): any {
    return this.store.get(StoreKeys.ACCESS_TOKEN_KEY);
  }

  public saveActiveUser(user: User | null): boolean {
    this.store.set(StoreKeys.ACTIVE_USER, user);
    return true;
  }

  public getStoreValue(key: string): any {
    return this.store.get(key);
  }

  public setStoreValue(key: string, value: any): boolean {
    this.store.set(key, value);
    return true;
  }

  public getPagePermissions(url: string): any {
    var permission = this.store.get(StoreKeys.USER_PERMISSIONS)
      .find((p: any) => p.address === url)?.permissions;

    return permission ? permission : { add: false, edit: false, delete: false }
  }
}
