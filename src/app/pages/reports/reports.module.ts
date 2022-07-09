import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterRequisitionReportComponent } from './water-requisition-report/water-requisition-report.component';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { PaymentCollectionReportComponent } from './payment-collection-report/payment-collection-report.component';
import { WaterDistributionReportComponent } from './water-distribution-report/water-distribution-report.component';



@NgModule({
  declarations: [
    WaterRequisitionReportComponent,
    DateRangePickerComponent,
    PaymentCollectionReportComponent,
    WaterDistributionReportComponent
  ],
  imports: [
    CommonModule,
    DxDateBoxModule,
    DxTextBoxModule,
    DxButtonModule,
    DxDataGridModule
  ]
})
export class ReportsModule {

}
