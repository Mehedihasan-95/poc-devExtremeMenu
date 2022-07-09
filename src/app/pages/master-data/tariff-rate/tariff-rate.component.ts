import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagePermissions, TarrifRate, UOM } from 'src/app/models/Master';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { ToasterService } from 'src/app/Services/toastr.service';
import { UserSessionStoreService } from 'src/app/Services/user-session-store.service';

@Component({
  selector: 'app-tariff-rate',
  templateUrl: './tariff-rate.component.html',
  styleUrls: ['./tariff-rate.component.scss']
})
export class TariffRateComponent {
  isLoaderVisible: boolean = false;
  DataSource: TarrifRate[] = [];
  units: UOM[] = [];
  permissions: PagePermissions;

  constructor(
    private _masterDataService: MasterDataService,
    private _router: Router,
    private _sessionService: UserSessionStoreService,
    private _toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.loadUnits();
    this.loadData();
    this.permissions = this._sessionService.getPagePermissions(this._router.url)
  }

  loadData() {
    this.isLoaderVisible = true;
    this._masterDataService.GetAllTariffRate().subscribe({
      next: (res) => {
        this.DataSource = res;
        this.isLoaderVisible = false;
      },
      error: (err) => {
        this.isLoaderVisible = false;   
        this._toasterService.showToaster('Faild to load data!', 'error');     
      },
    });
  }

  loadUnits() {
    this._masterDataService.GetAllUOM().subscribe({
      next: (data) => {
        this.units = data;
      },
      error: (err) => {
        this._toasterService.showToaster('Faild to load units!', 'error');
      }
    });
  }

  addTarrifRate(tarrifRate: TarrifRate) {
    
    this.isLoaderVisible = true;
    this._masterDataService.CreateTariffRate(tarrifRate).subscribe({
      next: (data) => {
       
        this._toasterService.showToaster('Successfully created!', 'success');
        this.isLoaderVisible = false; 
      },
      error: (err) => {
        
        this._toasterService.showToaster('Failed! Please try again', 'error');
        this.isLoaderVisible = false; 
      }
    });
  }

  updateTarrifRate(tarrifRate: TarrifRate) {
    
    this.isLoaderVisible = true;
    this._masterDataService.UpdateTariffRate(tarrifRate).subscribe({
      next: (data) => {
       
        this._toasterService.showToaster('Successfully updated!', 'success');
        this.isLoaderVisible = false; 
      }, error: (err) => {
        this._toasterService.showToaster('Failed! Please try again', 'error');
        this.isLoaderVisible = false; 
      }
    });
  }

  deleteTarrifRate(id: number) {
    this.isLoaderVisible = true;
    this._masterDataService.DeleteTariffRate(id).subscribe({
      next: (data) => {
        this._toasterService.showToaster('Successfully deleted!', 'success');
        this.isLoaderVisible = false; 
      },
      error: (err) => {
        this._toasterService.showToaster('Failed! Please try again', 'error');
        this.isLoaderVisible = false; 
        this.loadData();
      }
    });
  }

}
