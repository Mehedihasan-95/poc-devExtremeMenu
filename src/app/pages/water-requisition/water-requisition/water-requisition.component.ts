import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagePermissions, TarrifRate, UOM } from 'src/app/models/Master';
import { User, UserInfo } from 'src/app/models/Users';
import { WaterRequisition } from 'src/app/models/Water-requisition';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { StoreKeys } from 'src/app/Services/store-keys';
import { ToasterService } from 'src/app/Services/toastr.service';
import { UserSessionStoreService } from 'src/app/Services/user-session-store.service';
import { UserService } from 'src/app/Services/user.service';
import { WaterRequisitionService } from 'src/app/Services/water-requisition.service';


@Component({
  selector: 'app-water-requisition',
  templateUrl: './water-requisition.component.html',
  styleUrls: ['./water-requisition.component.scss']
})
export class WaterRequisitionComponent implements OnInit {
  isPopupVisible = false;
  isLoaderVisible: boolean = false;

  loading = false;
  rates: TarrifRate[] = []
  uoms: UOM[] = [];
  requisitions: WaterRequisition[] = [];
  userInfos: UserInfo[] = [];
  CreateWaterReq: WaterRequisition = new WaterRequisition();
  activeUser: User = this._sessionService.getStoreValue(StoreKeys.ACTIVE_USER);
  currentUser: UserInfo;
  selectedRequisition: WaterRequisition;
  permissions: PagePermissions;
  isAssignSchedule: boolean = false;

  addButtonOptions = {
    icon: 'plus',
    onClick: () => {
      if (!this.currentUser && this.activeUser.role?.name != 'Admin') {
        this._toasterService.showToaster("Please update profile first", "error");
        return;
      }
      this.CreateWaterReq.userInfo = this.currentUser;
      this.CreateWaterReq.regNo = this.currentUser.regNo;
      this.CreateWaterReq.userId = this.currentUser.userId ?? 0;
      this.isPopupVisible = true;
    }
  }
  phoneRules: any = { X: /[02-9]/ };

  submitButtonOptions = {
    text: 'SUBMIT',
    type: 'default',
    width: '150',
    useSubmitBehavior: true,
  }
  viewButtonOptions = {
    text: 'View Attachment',
    type: 'normal',
    width: '100%'
  }

  constructor(
    private _userService: UserService,
    private _sessionService: UserSessionStoreService,
    private _toasterService: ToasterService,
    private _masterService: MasterDataService,
    private _waterReqService: WaterRequisitionService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.permissions = this._sessionService.getPagePermissions(this._router.url)
    this.loadUserInfo();
    this.loadTarrifRates();
    this.loadMeasurementUnits();
  }

  resolveLoadWaterRequisitions() {
    if (this.activeUser.role?.name != 'Admin') {
      this.loadWaterRequisitionByRegNo(this.currentUser.regNo);
      return;
    }
    this.loadWaterRequisitions();
    this.loadAllUserInfos();
  }

  loadAllUserInfos() {
    this._userService.getAllUserInfos().subscribe({
      next: (data: UserInfo[]) => {
        this.userInfos = data;
      },
      error: (err: any) => {
        // console.log(err);;
      }
    });
  }

  loadWaterRequisitions() {
    this.isLoaderVisible = true;
    this._waterReqService.getAllWaterRequisitions().subscribe({
      next: (data: WaterRequisition[]) => {
        this.requisitions = data;
        this.isLoaderVisible = false;
      },
      error: (err: any) => {
        console.log(err);
        this.isLoaderVisible = false;
      }
    });
  }

  loadWaterRequisitionByRegNo(regNo: string) {
    // this.isLoaderVisible = true;
    this._waterReqService.getAllWaterRequisitionByRegNo(regNo).subscribe({
      next: (data: WaterRequisition[]) => {
        this.requisitions = data;
        // this.isLoaderVisible = false;
      },
      error: (err: any) => {
        console.log(err);
        // this.isLoaderVisible = false;
      }
    });
  }

  loadUserInfo(id: number = this.activeUser.id) {
    // this.isLoaderVisible = true;
    this._userService.getUserInfoByUserId(id).subscribe({
      next: (data: UserInfo) => {
        this.CreateWaterReq.userInfo = data;
        this.currentUser = data;
        this.CreateWaterReq.remarks = this.currentUser?.shipName;
        // this.isLoaderVisible = false;
        this.resolveLoadWaterRequisitions();
      },
      error: (err: any) => {
        console.log(err);
        // this.isLoaderVisible = false;
      }
    });
  }

  loadTarrifRates() {
    // this.isLoaderVisible = true;
    this._masterService.GetAllTariffRate().subscribe({
      next: (data: TarrifRate[]) => {
        this.rates = data;
        // this.isLoaderVisible = false;
      },
      error: (err: any) => {
        console.log(err);
        // this.isLoaderVisible = false;
      }
    });
  }

  loadMeasurementUnits() {
    // this.isLoaderVisible = true;
    this._masterService.GetAllUOM().subscribe({
      next: (data: any) => {
        this.uoms = data;
        // this.isLoaderVisible = false;
      },
      error: (err: any) => {
        console.log(err);
        // this.isLoaderVisible = false;
      }
    });
  }


  onFormCreate(e: any) {
    e.preventDefault();
    if (this.CreateWaterReq.userInfo
      && this.CreateWaterReq.reqDate
      && this.CreateWaterReq.uomId
      && this.CreateWaterReq.rate) {

      this.CreateWaterReq.reqDate = formatDate(this.CreateWaterReq.reqDate, 'yyyy-MM-dd', 'en-US');
      this.CreateWaterReq.id ? this.updateWaterRequisition() : this.addWaterRequisition();
      return;
    }
    this._toasterService.showToaster("Please fill all required fields", "error");
  }

  addWaterRequisition() {
    this._waterReqService.createWaterRequisition(this.CreateWaterReq).subscribe({
      next: (data: WaterRequisition) => {
        this.requisitions.push(data);
        this._toasterService.showToaster('Successfully created!', 'success')
      },
      error: (err: any) => {
        console.log(err);
        this._toasterService.showToaster('Failed! Please try again', 'error')
      },
      complete: () => {
        this.isPopupVisible = false;
      }
    });
  }

  updateWaterRequisition() {
    this._waterReqService.updateWaterRequisition(this.CreateWaterReq).subscribe({
      next: (data) => {
        this._toasterService.showToaster('Successfully updated!', 'success')
        this.loadWaterRequisitions();
      },
      error: (err) => {
        this._toasterService.showToaster('Failed! Please try again', 'error')
      },
      complete: () => {
        this.isPopupVisible = false;
      }
    })
  }

  onReqEdit(e: any) {
    e.cancel = true;
    if (e.data && (this.currentUser || this.activeUser.role?.name == 'Admin')) {
      this.CreateWaterReq = e.data;
      this.CreateWaterReq.userInfo = this.currentUser;
      if (this.activeUser.role?.name == 'Admin') {
        this.loadUserInfo(e.data.userId);
      }
      this.isPopupVisible = true;
      return;
    }
    this._toasterService.showToaster("Data not found, please update profile", "error");
  }

  onReqDelete(id: number) {
    this._waterReqService.deleteWaterRequisition(id).subscribe({
      next: (data) => {
        this.loadWaterRequisitions();
        this._toasterService.showToaster('Successfully deleted!', 'success')
      },
      error: (err) => {
        this._toasterService.showToaster('Failed! Please try again', 'error')
      },
    })
  }

  reset() {
    this.CreateWaterReq = new WaterRequisition();
  }

  onRateChanged() {
    var rate = this.rates.find(x => x.id == this.CreateWaterReq.rate);
    this.CreateWaterReq.uomId = this.uoms.find(x => x.id == rate?.uomId)?.id ?? 0;
  }

  onAssignSchedule(requisition: WaterRequisition) {
    this.selectedRequisition = requisition;
    this.isAssignSchedule = true;
  }

  onBack() {
    this.isAssignSchedule = false;
    this.resolveLoadWaterRequisitions();
  }

  onViewFile() { }

}
