import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagePermissions, Role } from 'src/app/models/Master';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { UserSessionStoreService } from 'src/app/Services/user-session-store.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  rolesDataSource: Role[] = [];
  permissions: PagePermissions;
  constructor(
    private _masterDataService: MasterDataService,
    private _router: Router,
    private _sessionService: UserSessionStoreService,
  ) { }

  ngOnInit(): void {
    this.loadRoles();
    this.permissions = this._sessionService.getPagePermissions(this._router.url)
  }

  loadRoles() {
    this._masterDataService.GetAllRoles().subscribe({
      next: (data) => {
        this.rolesDataSource = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { }
    })
  }

  addRole(role: Role) {
    //TODO: loader
    this._masterDataService.CreateRole(role).subscribe({
      next: (data) => {
        //TODO: Show toast
      },
      error: (err) => {
        //TODO: Show error toast
      }
    });
  }

  updateRole(role: Role) {
    //TODO: loader
    this._masterDataService.UpdateRole(role).subscribe({
      next: (data) => {
        //TODO: Show toast
      }, error: (err) => {
        //TODO: Show error toast
      }
    });
  }

  deleteRole(id: number) {
    //TODO: loader
    this._masterDataService.DeleteRole(id).subscribe({
      next: (data) => {
        //TODO: Show toast
      },
      error: (err) => {
        //TODO: Show error toast
        this.loadRoles();
      }
    });
  }

}
