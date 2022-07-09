import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Feature, Permission, Role, TarrifRate, UOM } from '../models/Master';


const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {



  constructor(
    private _httpClient: HttpClient,
  ) { }

  //==================== FEATURES SERVICE START ====================================

  GetAllFeatures() {
    return this._httpClient.get<Feature[]>(APIEndpoint + 'Features/GetAll');
  }

  GetFeaturesByRoleId(roleId: number) {
    let queryParams = new HttpParams().append("roleId", roleId);
    return this._httpClient.get<Feature[]>(APIEndpoint + 'Features/GetAllByRoleId', { params: queryParams });
  }

  UpdateFeatures(feature: Feature) {
    return this._httpClient.put<Feature>(APIEndpoint + 'Features', feature);
  }

  CreateFeatures(feature: Feature) {
    return this._httpClient.post<Feature>(APIEndpoint + 'Features', feature);
  }

  DeleteFeatures(id: number) {
    let queryParams = new HttpParams().append("id", id);
    return this._httpClient.delete(APIEndpoint + 'Features', { params: queryParams });
  }

  //==================== FEATURES SERVICE END ======================================

  //==================== UOM SERVICE START =========================================

  GetAllUOM() {
    return this._httpClient.get<UOM[]>(APIEndpoint + 'UOM/GetAll');
  }

  CreateUOM(uom: UOM) {
    return this._httpClient.post<UOM>(APIEndpoint + 'UOM', uom);
  }

  UpdateUom(uom: UOM) {
    return this._httpClient.put<UOM>(APIEndpoint + 'UOM', uom);
  }

  DeleteUOM(id: number) {
    let queryParams = new HttpParams().append("id", id);
    return this._httpClient.delete(APIEndpoint + 'UOM', { params: queryParams });
  }

  //==================== UOM SERVICE END ===========================================

  //==================== TARIFF RATE SERVICE START =================================

  GetAllTariffRate() {
    return this._httpClient.get<TarrifRate[]>(APIEndpoint + 'TarrifRate/GetAll');
  }

  CreateTariffRate(tariffRate: TarrifRate) {
    return this._httpClient.post<TarrifRate>(APIEndpoint + 'TarrifRate', tariffRate);
  }

  UpdateTariffRate(tariffRate: TarrifRate) {
    return this._httpClient.put<TarrifRate>(APIEndpoint + 'TarrifRate', tariffRate);
  }

  DeleteTariffRate(id: number) {
    let queryParams = new HttpParams().append("id", id);
    return this._httpClient.delete(APIEndpoint + 'TarrifRate', { params: queryParams });
  }

  //==================== TARIFF RATE SERVICE END ===================================

  //==================== ROLE SERVICE START ========================================

  GetAllRoles() {
    return this._httpClient.get<Role[]>(APIEndpoint + 'Roles/GetAll');
  }

  CreateRole(role: Role) {
    return this._httpClient.post<Role>(APIEndpoint + 'Roles', role);
  }

  UpdateRole(role: Role) {
    return this._httpClient.put<Role>(APIEndpoint + 'Roles', role);
  }

  DeleteRole(id: number) {
    let queryParams = new HttpParams().append("id", id);
    return this._httpClient.delete(APIEndpoint + 'Roles', { params: queryParams });
  }

  //==================== ROLE SERVICE END ==========================================

  //==================== PERMISSION SERVICE START ==================================

  GetPermissionsByRoleId(roleId: number) {
    let queryParams = new HttpParams().append("roleId", roleId);
    return this._httpClient.get<Permission[]>(APIEndpoint + 'Permission/GetByRoleId', { params: queryParams });
  }

  CreatePermissions(permissions: Permission[]) {
    return this._httpClient.post<Permission[]>(APIEndpoint + 'Permission/AddRange', permissions);
  }

  //==================== PERMISSION SERVICE END ====================================
}
