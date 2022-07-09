import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WaterBarge, WaterDispanceSlot, WaterDistribution, WaterOutlet, WaterRequisition } from '../models/Water-requisition';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class WaterRequisitionService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  //========================= WATER DISPENSE SLOT START =================================

  GetAllWaterDispenseSlots() {
    return this._httpClient.get<WaterDispanceSlot[]>(APIEndpoint + 'WaterDispenseSlot/GetAll');
  }

  CreateWaterDispenseSlot(waterDispenseSlot: WaterDispanceSlot) {
    return this._httpClient.post<WaterDispanceSlot>(APIEndpoint + 'WaterDispenseSlot', waterDispenseSlot);
  }

  updateWaterDispenseSlot(waterDispenseSlot: WaterDispanceSlot) {
    return this._httpClient.put<WaterDispanceSlot>(APIEndpoint + 'WaterDispenseSlot', waterDispenseSlot);
  }

  deleteWaterDispenseSlot(id: number) {
    let queryParams = new HttpParams().append('id', id);
    return this._httpClient.delete<WaterDispanceSlot>(
      APIEndpoint + 'WaterDispenseSlot', { params: queryParams }
    );
  }

  //========================= WATER DISPENSE SLOT END ===================================

  //========================= WATER REQUISITION SERVICE START ===========================

  getAllWaterRequisitions() {
    return this._httpClient.get<WaterRequisition[]>(APIEndpoint + 'WaterRequisition/GetAll');
  }

  getAllWaterRequisitionByRegNo(regNo: string) {
    let queryParams = new HttpParams().append('regNo', regNo);
    return this._httpClient.get<WaterRequisition[]>(APIEndpoint + 'WaterRequisition/GetAllByRegNo',
      { params: queryParams });
  }

  createWaterRequisition(waterRequisition: WaterRequisition) {
    return this._httpClient.post<WaterRequisition>(APIEndpoint + 'WaterRequisition', waterRequisition);
  }

  updateWaterRequisition(waterRequisition: WaterRequisition) {
    return this._httpClient.put<WaterRequisition>(APIEndpoint + 'WaterRequisition', waterRequisition);
  }

  deleteWaterRequisition(id: number) {
    let queryParams = new HttpParams().append('id', id);
    return this._httpClient
      .delete<WaterRequisition>(APIEndpoint + 'WaterRequisition', { params: queryParams });
  }

  //========================= WATER REQUISITION SERVICE END =============================

  //========================= WATER DISTRIBUTION SERVICE START ==========================

  getAllWaterDistributions() {
    return this._httpClient.get<WaterDistribution[]>(APIEndpoint + 'WaterDistribution/GetAll');
  }

  getAllWaterDistributionsWithDetails() {
    return this._httpClient.get<WaterDistribution[]>(APIEndpoint + 'WaterDistribution/GetAllWithDetails');
  }

  createWaterDistribution(waterDistribution: WaterDistribution) {
    return this._httpClient.post<WaterDistribution>(APIEndpoint + 'WaterDistribution', waterDistribution);
  }

  updateWaterDistribution(waterDistribution: WaterDistribution) {
    return this._httpClient.put<WaterDistribution>(APIEndpoint + 'WaterDistribution', waterDistribution);
  }

  deleteWaterDistribution(id: number) {
    let queryParams = new HttpParams().append('id', id);
    return this._httpClient
      .delete<WaterDistribution>(APIEndpoint + 'WaterDistribution', { params: queryParams });
  }

  //========================= WATER DISTRIBUTION SERVICE END ============================

  //========================= WATER BARGE SERVICE START =================================

  getAllWaterBarges() {
    return this._httpClient.get<WaterBarge[]>(APIEndpoint + 'WaterBarge/GetAll');
  }

  //========================= WATER BARGE SERVICE END ===================================


  //========================= WATER OUTLET SERVICE START =================================

  getAllWaterOutlets() {
    return this._httpClient.get<WaterOutlet[]>(APIEndpoint + 'WaterOutlet/GetAll');
  }

  //========================= WATER OUTLET SERVICE END ===================================
}
