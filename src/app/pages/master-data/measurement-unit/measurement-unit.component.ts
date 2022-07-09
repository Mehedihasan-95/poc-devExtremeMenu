import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PagePermissions, UOM } from 'src/app/models/Master';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { ToasterService } from 'src/app/Services/toastr.service';
import { UserSessionStoreService } from 'src/app/Services/user-session-store.service';

@Component({
  selector: 'app-measurement-unit',
  templateUrl: './measurement-unit.component.html',
  styleUrls: ['./measurement-unit.component.scss']
})

export class MeasurementUnitComponent {
  isLoaderVisible: boolean = false;

  DataSource: UOM[] = []
  permissions: PagePermissions;
  constructor(
    private _masterDataService: MasterDataService,
    private _router: Router,
    private _sessionService: UserSessionStoreService,
    private _toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.permissions = this._sessionService.getPagePermissions(this._router.url)
  }

  loadData() {
    
    this.isLoaderVisible = true;
    this._masterDataService.GetAllUOM().subscribe({
      next: (data) => {
        this.DataSource = data;
        this.isLoaderVisible = false;
      },
      error: (err) => {
        this._toasterService.showToaster('Faild to load data!', 'error');
        this.isLoaderVisible = false;
        // console.log(err);
      },
      complete: () => {

      }
    });
  }

  addUOM(uom: UOM) {
    
    this.isLoaderVisible = true;
    this._masterDataService.CreateUOM(uom).subscribe({
      next: (data) => {
        this._toasterService.showToaster('Successfully created!', 'success')
        this.isLoaderVisible = false;
      },
      error: (err) => {
        this._toasterService.showToaster('Failed! Please try again', 'error')
        this.isLoaderVisible = false;
        // console.log("Errored");
      },
      complete: () => {
        // console.log("Completed");        
      }
    });
  }

  updateUOM(uom: UOM) {
    
    this.isLoaderVisible = true;
    this._masterDataService.UpdateUom(uom).subscribe({
      next: (data) => {
        this._toasterService.showToaster('Successfully updated!', 'success');
        this.isLoaderVisible = false;
      }, error: (err) => {
        this._toasterService.showToaster('Failed! Please try again', 'error')
        this.isLoaderVisible = true;
      }
    });
  }

  deleteUOM(id: number) {
    
    this.isLoaderVisible = true;
    this._masterDataService.DeleteUOM(id).subscribe({
      next: (data) => {
        this._toasterService.showToaster('Successfully deleted!', 'success');
        this.isLoaderVisible = true;
      },
      error: (err) => {
        this._toasterService.showToaster('Failed! Please try again', 'error')
        this.isLoaderVisible = true;
      }
    });
  }

}
