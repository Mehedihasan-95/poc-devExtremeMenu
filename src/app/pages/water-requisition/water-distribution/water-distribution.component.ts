import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagePermissions, TarrifRate, UOM } from 'src/app/models/Master';
import { WaterDistribution, WaterOutlet } from 'src/app/models/Water-requisition';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { UserSessionStoreService } from 'src/app/Services/user-session-store.service';
import { WaterRequisitionService } from 'src/app/Services/water-requisition.service';


@Component({
  selector: 'app-water-distribution',
  templateUrl: './water-distribution.component.html',
  styleUrls: ['./water-distribution.component.scss']
})
export class WaterDistributionComponent {
  loading = false;
  isPopupVisible: boolean = false;

  userInfo = [];
  dataSource: WaterDistribution[];
  uoms: UOM[] = [];
  rates: TarrifRate[] = [];
  waterOutlets: WaterOutlet[] = [];
  selectedWaterDistribution: WaterDistribution;
  permissions: PagePermissions;

  submitButtonOptions = {
    text: 'SUBMIT',
    type: 'default',
    width: '150',
    useSubmitBehavior: true,
  }

  constructor(
    private _requisitionService: WaterRequisitionService,
    private _masterService: MasterDataService,
    private _router: Router,
    private _sessionService: UserSessionStoreService
  ) { }

  ngOnInit(): void {
    this.permissions = this._sessionService.getPagePermissions(this._router.url);
    this.loadUoms();
    this.loadWaterOutlets();
    this.loadTarrifRates();
    this.loadWaterDistributions();
  }

  loadWaterDistributions() {
    this._requisitionService.getAllWaterDistributionsWithDetails().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadUoms() {
    this._masterService.GetAllUOM().subscribe({
      next: (data) => {
        this.uoms = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadWaterOutlets() {
    this._requisitionService.getAllWaterOutlets().subscribe({
      next: (data) => {
        this.waterOutlets = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadTarrifRates() {
    this._masterService.GetAllTariffRate().subscribe({
      next: (data) => {
        this.rates = data;
      }
    });
  }

  onDistribution(e: any) {
    this.isPopupVisible = true;
    console.log(e, this.isPopupVisible);
  }

  onDistributeBtnClick(waterDistribution: WaterDistribution) {
    this.selectedWaterDistribution = waterDistribution;
    this.selectedWaterDistribution.distributedQty = waterDistribution.qty;
    this.selectedWaterDistribution.paymentStatus = 'Paid';
    this.isPopupVisible = true;
  }

  onFormSubmit(e: any) {
    e.preventDefault();
    console.log(e, this.selectedWaterDistribution);
    this.selectedWaterDistribution.distributionStatus = "Completed";
    this.distributeWater();
  }

  distributeWater() {
    this._requisitionService.updateWaterDistribution(this.selectedWaterDistribution).subscribe({
      next: (data) => {
        console.log(data);
        this.isPopupVisible = false;
        this.loadWaterDistributions();
      }
    });
  }


}
