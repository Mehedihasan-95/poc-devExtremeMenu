import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasurementUnitComponent } from './measurement-unit/measurement-unit.component';
import { DxButtonModule, DxDataGridModule, DxLoadIndicatorModule, DxPopupModule, DxSelectBoxModule, DxTreeListModule } from 'devextreme-angular';
import { TariffRateComponent } from './tariff-rate/tariff-rate.component';
import { RoleListComponent } from './role-list/role-list.component';
import { FeatureAssignComponent } from './feature-assign/feature-assign.component';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { StatusCodeManagementComponent } from './status-code-management/status-code-management.component';



@NgModule({
  declarations: [
    MeasurementUnitComponent,
    TariffRateComponent,
    RoleListComponent,
    FeatureAssignComponent,
    FeatureListComponent,
    StatusCodeManagementComponent,
  ],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxTreeListModule,
    DxLoadIndicatorModule
  ]
})
export class MasterDataModule { }
