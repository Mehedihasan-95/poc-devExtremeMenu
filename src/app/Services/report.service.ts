import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WaterReqReportDTO } from '../models/Report';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  getWaterRequisitionReport(fromDate: any, toDate: any, regNo: string) {
    let queryParams = new HttpParams()
      .append('fromDate', fromDate)
      .append('toDate', toDate)
      .append('regNo', regNo);
    return this._httpClient.get<WaterReqReportDTO[]>(APIEndpoint + 'WaterRequisition/Report', { params: queryParams });
  }


  getPaymentCollectionReport(fromDate: any, toDate: any, regNo: string) {
    let queryParams = new HttpParams()
      .append('fromDate', fromDate)
      .append('toDate', toDate)
      .append('regNo', regNo);
    return this._httpClient.get<WaterReqReportDTO[]>(APIEndpoint + 'Bills/Report', { params: queryParams });
  }
}
