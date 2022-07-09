import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feature, PagePermissions, Permission, Role } from 'src/app/models/Master';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { ToasterService } from 'src/app/Services/toastr.service';
import { UserSessionStoreService } from 'src/app/Services/user-session-store.service';


@Component({
  selector: 'app-feature-assign',
  templateUrl: './feature-assign.component.html',
  styleUrls: ['./feature-assign.component.scss']
})
export class FeatureAssignComponent {
  isRoleSelected: boolean = false;
  isLoaderVisible: boolean = false;

  roleList: Role[] = [];
  selectedRoleId: number;
  DataSource: Feature[] = [];
  permissions: Permission[] = [];
  updatedFeatures: Feature[] = [];
  selectedFeatureKeys: number[] = [];
  pagePermissions: PagePermissions;

  constructor(
    private _masterDataService: MasterDataService,
    private _router: Router,
    private _sessionService: UserSessionStoreService,
    private _toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.loadFeatures();
    this.loadRoles();
    this.pagePermissions = this._sessionService.getPagePermissions(this._router.url)
  }

  loadFeatures() {
    this.isLoaderVisible = true;
    this._masterDataService.GetAllFeatures().subscribe({
      next: (res) => { 
        this.DataSource = res; this.processFeatures(); 
        this.isLoaderVisible = false;
      },
      error: (err) => { 
        console.log(err); 
        this.isLoaderVisible = false;
        this._toasterService.showToaster('Faild to load feature!', 'error');
      }
    });
  }

  loadRoles() {
    this.isLoaderVisible = true;
    this._masterDataService.GetAllRoles().subscribe({
      next: (res) => {
        this.roleList = res;
        this.processFeatures();
        this.isLoaderVisible = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoaderVisible = false;
        this._toasterService.showToaster('Faild to load role!', 'error');
      }
    });
  }

  loadPermissions(roleId: number) {
  
    this.reset();
    this._masterDataService.GetPermissionsByRoleId(roleId).subscribe({
      next: (res) => {
        this.permissions = res;
        this.selectedFeatureKeys = this.permissions.map(x => x.featureId);
        this.processFeatures();
        this.isRoleSelected = true;
      },
      error: (err) => {
        // console.log(err);
        this.isRoleSelected = false;
      }
    });
  }

  reset() {
    this.permissions = [];
    this.updatedFeatures = [];
  }

  // ADD PERMISSIONS TO FEATURES 
  processFeatures() {
    if (this.DataSource.length > 0) {
      this.DataSource.forEach(feature => {
        var featurePermission = this.permissions.filter(permission => permission.featureId == feature.id)[0];
        var permissions = featurePermission?.permissions ? JSON.parse(featurePermission?.permissions) : null;
        if (permissions) {
          feature.add = permissions.add;
          feature.edit = permissions.edit;
          feature.delete = permissions.delete;
        } else {
          feature.add = false;
          feature.edit = false;
          feature.delete = false;
        }
      });
    }
  }

  onFeatureUpdate(updateFeature: Feature) {
    this.updatedFeatures = this.updatedFeatures.filter(feature => feature.id != updateFeature.id);
    this.updatedFeatures.push(updateFeature);
  }

  // GENERATE PERMISSIONS FOR SELECTED FEATURES
  processPermissions() {
    let updatedPermissions: Permission[] = [];
    this.updatedFeatures.forEach(feature => {
      var permission = this.convertFeatureToPermission(feature);
      updatedPermissions.push(permission);
    });
    return updatedPermissions;
  }

  updatePermissions() {
    this.isLoaderVisible = true;
    if (this.selectedRoleId > 0) {
      this._masterDataService.CreatePermissions(this.processPermissions()).subscribe({
        next: (res) => {
          // console.log(res);
          this.reset();
          this.loadPermissions(this.selectedRoleId);
          this._toasterService.showToaster('Successfully updated!', 'success')
          this.isRoleSelected = false;
          this.isLoaderVisible = false;
        },
        error: (err) => {
          // console.log(err);
          this.isLoaderVisible = false;
          this._toasterService.showToaster('Failed! Please try again', 'error')
        }
      });
    }
  }

  convertFeatureToPermission(feature: Feature): Permission {
    var permission = <Permission>{ isActive: true };
    permission.roleId = this.selectedRoleId;
    permission.featureId = feature.id;
    permission.permissions = JSON.stringify({
      add: feature.add,
      edit: feature.edit,
      delete: feature.delete
    });
    return permission;
  }

  onSelectionChange(e: any) {
    // console.log(e);
    this.updatedFeatures = [];
    e.selectedRowsData.forEach((data: Feature) => {
      this.onFeatureUpdate(data);
      if (data?.parentId > 0) {
        var parent = this.DataSource.filter(feature => feature.id == data.parentId)[0];
        parent ? this.onFeatureUpdate(parent) : null;
      }
      // else if (data?.parentId == 0) {
      //   this.DataSource.filter(feature => feature.parentId == data.id)
      //     .forEach(child => this.onFeatureUpdate(child));
      // }
    })
    // console.log(this.updatedFeatures);

  }

}
