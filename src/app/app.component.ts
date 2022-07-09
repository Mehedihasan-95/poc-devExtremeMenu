import { Component, HostBinding } from '@angular/core';
import { StoreKeys } from './Services/store-keys';
import { UserSessionStoreService } from './Services/user-session-store.service';
import { ScreenService, AppInfoService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(
    private screen: ScreenService,
    public appInfo: AppInfoService,
    private _sessionStorage: UserSessionStoreService) {

  }

  isAuthenticated() {
    return this._sessionStorage.getAccessToken()?.length > 1
      && this._sessionStorage.getStoreValue(StoreKeys.ACTIVE_USER)
      && this._sessionStorage.getStoreValue(StoreKeys.NAVIGATION)
      ? true : false;
  }
}
