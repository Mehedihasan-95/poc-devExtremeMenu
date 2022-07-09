import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterRequisitionComponent } from './water-requisition/water-requisition.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxPopupModule, DxSchedulerModule, DxSelectBoxModule } from 'devextreme-angular';
import { AssignScheduleComponent } from './assign-schedule/assign-schedule.component';
import { WaterDistributionComponent } from './water-distribution/water-distribution.component';



@NgModule({
  declarations: [
    WaterRequisitionComponent,
    AssignScheduleComponent,
    WaterDistributionComponent
  ],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxSchedulerModule,
    DxFormModule
  ]
})
export class WaterRequisitionModule { }
