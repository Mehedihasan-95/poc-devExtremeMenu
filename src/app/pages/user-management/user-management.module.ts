import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { DxDataGridModule, DxFormModule, DxPopupModule, DxScrollViewModule } from 'devextreme-angular';
import { UserInfoFormComponent } from './user-info-form/user-info-form.component';



@NgModule({
  declarations:[
    UserInfoComponent,
    UserInfoFormComponent,
  ],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxPopupModule,
    DxFormModule,
    DxScrollViewModule
  ]
})
export class UserManagementModule { }
