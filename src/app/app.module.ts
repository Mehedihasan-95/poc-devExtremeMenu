import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { DxButtonModule, DxCheckBoxModule, DxContextMenuModule, DxDrawerModule, DxFormModule, DxListModule, DxLoadIndicatorModule, DxScrollViewModule, DxToolbarModule, DxTreeViewModule } from 'devextreme-angular';
import { SideNavInnerToolbarComponent, SingleCardComponent } from './layouts';
import { FooterComponent, HeaderComponent, SideNavigationMenuComponent, UserPanelComponent } from './login';
import { HttpClient, HttpClientModule, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './AppHttpInterceptor';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleCardComponent,
    SideNavigationMenuComponent,
    SideNavInnerToolbarComponent,
    FooterComponent,
    HeaderComponent,
    UserPanelComponent,
    ProfileComponent
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
    DxFormModule,
    DxDrawerModule,
    DxScrollViewModule,
    HttpClientModule
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
