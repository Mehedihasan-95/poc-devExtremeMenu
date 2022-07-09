import { DatePipe,formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WaterReqReportDTO } from 'src/app/models/Report';
import { ReportService } from "../../../Services/report.service";

@Component({
  selector: 'app-payment-collection-report',
  templateUrl: './payment-collection-report.component.html',
  styleUrls: ['./payment-collection-report.component.scss']
})
export class PaymentCollectionReportComponent implements OnInit {
  fromDate: any;
  toDate: any;
  pipe = new DatePipe('en-US');
  registrationNo: string;
  reportData: WaterReqReportDTO[];
  


  constructor( private _reportService : ReportService) { }

  ngOnInit(): void {
  }

  getReport(){
    if(this.fromDate, this.toDate, this.registrationNo){
      let fromDateString = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
      let toDateString = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
      this._reportService.getPaymentCollectionReport(fromDateString, toDateString, this.registrationNo).subscribe({
        next: (data) => {
          this.reportData = data;
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

}
