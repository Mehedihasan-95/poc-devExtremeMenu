import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { DxButtonModule, DxCheckBoxModule, DxContextMenuModule, DxDrawerModule, DxFormModule, DxListModule, DxLoadIndicatorModule, DxScrollViewModule, DxToolbarModule, DxTreeViewModule } from 'devextreme-angular';
import { SideNavInnerToolbarComponent, SideNavOuterToolbarComponent, SingleCardComponent } from './layouts';
import { ChangePasswordFormComponent, CreateAccountFormComponent, FooterComponent, HeaderComponent, LoginFormComponent, ResetPasswordFormComponent, SideNavigationMenuComponent, UserPanelComponent } from './login';
import { LoginFormPanelComponent } from './login/login-form-panel/login-form-panel.component';
import { HttpClient, HttpClientModule, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './AppHttpInterceptor';
import { MasterDataModule } from './pages/master-data/master-data.module';
import { ReportsModule } from './pages/reports/reports.module';
import { WaterRequisitionModule } from './pages/water-requisition/water-requisition.module';
import { UserManagementModule } from './pages/user-management/user-management.module';
import { OtpComponent } from './login/otp/otp.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleCardComponent,
    SideNavigationMenuComponent,
    SideNavInnerToolbarComponent,
    SideNavOuterToolbarComponent,
    ChangePasswordFormComponent,
    CreateAccountFormComponent,
    FooterComponent,
    HeaderComponent,
    LoginFormComponent,
    ResetPasswordFormComponent,
    UserPanelComponent,
    LoginFormPanelComponent,
    OtpComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxToolbarModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxTreeViewModule,
    DxContextMenuModule,
    DxListModule,
    DxDrawerModule,
    DxScrollViewModule,
    HttpClientModule,
    MasterDataModule,
    ReportsModule,
    WaterRequisitionModule,
    UserManagementModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
