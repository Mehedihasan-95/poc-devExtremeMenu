import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Feature, Menu } from 'src/app/models/Master';
import notify from 'devextreme/ui/notify';

import { LoginUser } from 'src/app/models/Users';
import { AuthService } from 'src/app/Services/auth.service';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { StoreKeys } from 'src/app/Services/store-keys';
import { UserSessionStoreService } from 'src/app/Services/user-session-store.service';
import { ToasterService } from 'src/app/Services/toastr.service';

@Component({
  selector: 'app-login-form-panel',
  templateUrl: './login-form-panel.component.html',
  styleUrls: ['./login-form-panel.component.scss']
})
export class LoginFormPanelComponent implements OnInit {
  isLoading = false;
  loginUser: LoginUser = { Email: '', Password: '' };

  @Output() formStateEvent = new EventEmitter<string>();


  constructor(
    private _authService: AuthService,
    private _sessionService: UserSessionStoreService,
    private _masterDataService: MasterDataService,
    private _toasterService: ToasterService) { }

  ngOnInit(): void { }

  sendFromStateEvent(state: string) {
    this.formStateEvent.emit(state);
  }

  buttonOptions: any = {
    text: 'LOGIN',
    type: 'normal',
    width: '150',
    useSubmitBehavior: true,
  };



  onFormSubmit(e: any) {
    e.preventDefault();
    this.isLoading = true;
    this._authService.getUserToken(this.loginUser).subscribe({
      next: (res) => {
        this._sessionService.saveAccessToken(res?.bearer);
        this.loadActiveUser(res.id);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        //TODO: Show err toast
       this._toasterService.showToaster('Username/Password do not match!', 'error')
      }

    })
  }

  loadActiveUser(id: number) {
    this._authService.getActiveUser(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.loadUserFeatures(res.roleId);
        this._sessionService.saveActiveUser(res);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  loadUserFeatures(roleId: number) {
    this._masterDataService.GetFeaturesByRoleId(roleId).subscribe({
      next: (res) => {
        console.log(res);
        this._sessionService.setStoreValue(StoreKeys.NAVIGATION, this.processFeatures(res));
        this._sessionService
          .setStoreValue(
            StoreKeys.USER_PERMISSIONS,
            res.map(f => ({
              address: f.url,
              permissions: JSON.parse(f.permissions)
            }))
          );

        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  processFeatures(features: Feature[]) {
    let navigation: Menu[] = [];
    let onlyParentFeatures = features.filter(f => f.parentId == 0);
    onlyParentFeatures.forEach(parentFeature => {
      let menuItem: Menu = {
        text: parentFeature.name,
        icon: parentFeature.iconName,
        path: parentFeature.url.trim().length > 0 ? parentFeature.url : undefined,
        items: this.generateMenuItemsFromFeaturesByParentId(features, parentFeature.id)
      }
      navigation.push(menuItem);
    });
    console.log(navigation);
    return navigation;
  }

  generateMenuItemsFromFeaturesByParentId(features: Feature[], parentId: number) {
    let menuItems: Menu[] = [];
    features.filter(f => f.parentId == parentId).forEach(feature => {
      let menuItem: Menu = {
        text: feature.name,
        // icon: feature.iconName,
        path: feature.url,
        items: []
      }
      menuItems.push(menuItem);
    });
    return menuItems;
  }

}
