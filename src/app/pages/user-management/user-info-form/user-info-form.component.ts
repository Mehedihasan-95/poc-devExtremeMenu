import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { Role } from 'src/app/models/Master';
import { User, UserInfo } from 'src/app/models/Users';
import { MasterDataService } from 'src/app/Services/master-data.service';
import { ToasterService } from 'src/app/Services/toastr.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.scss']
})
export class UserInfoFormComponent implements OnInit {
  loading = false;
  isLoaderVisible:boolean = false;
  userInfo: UserInfo = new UserInfo();
  roles: Role[] = [];

  @Input() selectedUser: User | null;

  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;

  constructor(
    private _userService: UserService,
    private _masterDataService: MasterDataService,
    private _toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.loadRoles();
    this.manageSelectedUserInfo();
  }

  resetForm(){
    this.userInfo = new UserInfo();
    this.form.instance.resetValues();
  }

  loadRoles() {
    this.isLoaderVisible = true;
    this._masterDataService.GetAllRoles().subscribe({
      next: (data) => {
        this.roles = data;
        this.isLoaderVisible = false;
      },
      error: (err) => {
        // console.log(err);
        this.isLoaderVisible = false;
        this._toasterService.showToaster('Faild to load roles!', 'error');  
      }
    });
  }

  manageSelectedUserInfo() {
    if (!this.selectedUser?.id) {
      this.userInfo = new UserInfo();
      return
    }
    this.userInfo.userId = this.selectedUser.id;
    this.loadUserInfoById(this.selectedUser.id);
  }

  phoneRules: any = { X: /[02-9]/ };

  submitButtonOptions = {
    text: 'SUBMIT',
    type: 'default',
    width: '150',
    useSubmitBehavior: true,
  }

  passwordComparison = () => this.form.instance.option('formData').user.password;

  loadUserInfoById(id: number) {
    this.isLoaderVisible = true;
    this._userService.getUserInfoByUserId(id).subscribe({
      next: (data) => {
        this.userInfo = data;
        this.isLoaderVisible = false;
      },
      error: (err) => {
        if (this.selectedUser) {
          this.userInfo.user = this.selectedUser;
          this.isLoaderVisible = false;
          this._toasterService.showToaster('Failed to load user-info', 'error');
        }
      }
    });
  }

  checkComparison() {
    return true;
  }

  onFormSubmit(e: any) {
    e.preventDefault();
    if (!this.userInfo?.id) {
      this.createUserInfo();
      return;
    }
    this.updateUserInfo();
  }

  createUserInfo() {
    this._userService.createUserInfo(this.userInfo).subscribe({
      next: (data) => {
        this.userInfo = data;
        this._toasterService.showToaster('Successfully created!', 'success');
      },
      error: (err) => {
        console.log(err);
        this._toasterService.showToaster('Failed! Please try again', 'error');
      }
    });
  }

  updateUserInfo() {
    this._userService.updateUserInfo(this.userInfo).subscribe({
      next: (data) => {
        this.userInfo = data;
        this._toasterService.showToaster('Successfully updated!', 'success');
      },
      error: (err) => {
        // console.log(err);
        this._toasterService.showToaster('Failed! Please try again', 'error');
      }
    });
  }

}
