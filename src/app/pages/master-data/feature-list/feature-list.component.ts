import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feature, PagePermissions } from 'src/app/models/Master';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { ToasterService } from 'src/app/Services/toastr.service';
import { UserSessionStoreService } from 'src/app/Services/user-session-store.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {
  popupVisible: boolean = false;
  isLoaderVisible: boolean = false;

  allFeatures: Feature[] = [];
  onlyParentFeatures: Feature[] = [];
  selectedParent: Feature;
  selectedParentsChild: Feature[] = [];
  permissions: PagePermissions;

  constructor(
    private _masterDataService: MasterDataService,
    private _router: Router,
    private _sessionService: UserSessionStoreService,
    private _toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.loadFeatures();
    this.permissions = this._sessionService.getPagePermissions(this._router.url)
  }

  loadFeatures() {
    this.isLoaderVisible = true;
    this._masterDataService.GetAllFeatures().subscribe({
      next: (data) => {
        this.allFeatures = data;
        this.onlyParentFeatures = data.filter(feature => feature.parentId == 0);
        this.isLoaderVisible = false;
      },
      error: (err) => {
        this._toasterService.showToaster('Faild to load feature!', 'error');
        // console.log(err);
        this.isLoaderVisible = false;
      }
    });
  }

  onSelectParent(selectedParent: Feature) {
    this.selectedParent = selectedParent;
    this.selectedParentsChild = this.allFeatures
      .filter(feature => feature.parentId == selectedParent.id);

    this.popupVisible = true;
  }

  updateFeature(feature: Feature) {
    this.isLoaderVisible = true;
    this._masterDataService.UpdateFeatures(feature).subscribe({
      next: (data) => {
        //TODO: Show toast
        this._toasterService.showToaster('Successfully updated!', 'success')
        this.isLoaderVisible = false;
      },
      error: (err) => {
        //TODO: Show error toast
        this._toasterService.showToaster('Failed! Please try again', 'error')
        this.isLoaderVisible = false;
      }
    });
  }

  createFeature(feature: Feature, isChild: boolean = false) {
    this.isLoaderVisible = true;
    isChild ? this.prepFeatureChild(feature) : null;
    this._masterDataService.CreateFeatures(feature).subscribe({
      next: (data) => {
        //TODO: Show toast
        this._toasterService.showToaster('Successfully created!', 'success')
        this.isLoaderVisible = false;
        this.loadFeatures();
      },
      error: (err) => {
        //TODO: Show error toast
        this._toasterService.showToaster('Failed! Please try again', 'error')
        this.isLoaderVisible = false;
      }
    });
  }

  deleteFeature(feature: Feature) {
    this.isLoaderVisible = true;
    console.log(feature);
    this._masterDataService.DeleteFeatures(feature.id).subscribe({
      next: (data) => {
        //TODO: Show toast
        this._toasterService.showToaster('Successfully deleted!', 'success')
        this.isLoaderVisible = false;
        this.loadFeatures();
      },
      error: (err) => {
        //TODO: Show error toast
        this._toasterService.showToaster('Failed! Please try again', 'error')
        this.isLoaderVisible = false;
      },
    });
  }

  prepFeatureChild(feature: Feature) {
    feature.parentId = this.selectedParent.id;
    feature.parentName = this.selectedParent.name;
  }

}
