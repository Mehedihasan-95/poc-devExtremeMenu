import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-water-distribution-report',
  templateUrl: './water-distribution-report.component.html',
  styleUrls: ['./water-distribution-report.component.scss']
})
export class WaterDistributionReportComponent implements OnInit {
  fromDate:any;
  toDate:any;
  registrationNo: string;
  reportData=[];

  constructor() { }

  ngOnInit(): void {
  }

  getReport(){}

}
