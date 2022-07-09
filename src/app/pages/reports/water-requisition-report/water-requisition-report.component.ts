import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WaterReqReportDTO } from 'src/app/models/Report';
import { ReportService } from 'src/app/Services/report.service';

@Component({
  selector: 'app-water-requisition-report',
  templateUrl: './water-requisition-report.component.html',
  styleUrls: ['./water-requisition-report.component.scss']
})
export class WaterRequisitionReportComponent implements OnInit {
  fromDate: any;
  toDate: any;
  pipe = new DatePipe('en-US');
  registrationNo: string;

  reportData: WaterReqReportDTO[];

  constructor(
    private _reportService: ReportService
  ) { }

  ngOnInit(): void { }

  getReport() {
    if (this.fromDate, this.toDate, this.registrationNo) {
      let fromDateString = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
      let toDateString = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
      this._reportService.getWaterRequisitionReport(fromDateString, toDateString, this.registrationNo)
        .subscribe({
          next: (data) => {
            this.reportData = data;

          },
          error: (err) => {
            console.log(err);
          }
        });
    }
  }

}
