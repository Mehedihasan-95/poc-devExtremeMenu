import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { User } from 'src/app/models/Users';
import { UserService } from "../../Services/user.service";
import { ToasterService } from 'src/app/Services/toastr.service';
@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  loading = false;
  createUser: User = new User();

  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;

  @Output() createAccountEvent = new EventEmitter<string>();


  buttonOptions = {
    text: 'CREATE ACCOUNT',
    type: 'normal',
    width: '180',
    useSubmitBehavior: true,
  };

  phoneRules: any = { X: /[02-9]/ };
  namePattern: any = /^[a-zA-Z0-9]+$/;
  passPattern: any = /^(?=.*[A-Za-z])(?=.*\d)[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,}$/;

  passwordComparison = () => this.form.instance.option('formData').Password;
  checkComparison() {
    return true;
  }


  constructor(private _createUserService: UserService, private _toasterService: ToasterService) { }



  onFormCreate(e: any) {
    this._createUserService.getCreatedUser(this.createUser).subscribe({
      next: (res) => {
        console.log(" create res ->" + res);
        this._toasterService.showToaster('Registration Complete!', 'success');
        this.onLoginPage();
      },
      error: (err) => {
        console.log(err);
        this._toasterService.showToaster('Registration failed! Please try again', 'error')
      }
    })
    e.preventDefault();
  };

  async onSubmit(e: Event) {

  }

  onLoginPage() {
    this.createAccountEvent.emit("login")
  }

}
