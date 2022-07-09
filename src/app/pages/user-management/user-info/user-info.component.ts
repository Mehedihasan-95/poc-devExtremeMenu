import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagePermissions } from 'src/app/models/Master';
import { User } from 'src/app/models/Users';
import { ToasterService } from 'src/app/Services/toastr.service';
import { UserSessionStoreService } from 'src/app/Services/user-session-store.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})

export class UserInfoComponent implements OnInit {
  isPopupVisible:boolean = true;
  isLoaderVisible:boolean = false;

  permissions: PagePermissions;
  states = UserInfoMode;
  compState: UserInfoMode = this.states.userList;
  users: User[] = [];
  selectedUser: User | null;


  constructor(
    private _userService: UserService,
    private _toasterService: ToasterService,
    private _router: Router,
    private _sessionService: UserSessionStoreService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.permissions = this._sessionService.getPagePermissions(this._router.url)
  }

  loadUsers() {
    this.isLoaderVisible = true;
    this._userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoaderVisible = false;
      },
      error: (err) => {
        // console.log(err);
        this.isLoaderVisible = false;
      }
    });
  }

  addButtonOptions = {
    icon: 'plus',
    onClick: () => {
      this.manageState(this.states.form);
    }
  }

  manageState(state: UserInfoMode) {
    this.compState = state;
    if (this.compState === this.states.userList) {
      this.loadUsers();
      this.selectedUser = null;      
    }
  }

  manageEdit(user?: User) {
    this.selectedUser = user ? user : null;
    this.manageState(this.states.form);
  }

  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe({
      next: (data) => {
        this._toasterService.showToaster('Successfully deleted', 'success');
        this.loadUsers();
      },
      error: (err) => {
        this._toasterService.showToaster('Failed! Please try again', 'error');
      }
    });
  }
}


export enum UserInfoMode {
  userList,
  form
}
