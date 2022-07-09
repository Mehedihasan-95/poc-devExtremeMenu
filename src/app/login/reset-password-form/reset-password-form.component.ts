import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular/ui/form';
import { ResetCode } from 'src/app/models/Users';
import { ToasterService } from 'src/app/Services/toastr.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  
  loading = false;
  formData: any = {Password:""};

  @Input() resetCode: ResetCode;
  @Output() resetCodeChange = new EventEmitter();
  @Output() formStateEvent = new EventEmitter<string>();

  constructor(private _userService: UserService, private _toasterService: ToasterService) { }
  
  passwordComparison = () => this.form.instance.option('formData').Password;
  passPattern: any = /^(?=.*[A-Za-z])(?=.*\d)[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,}$/;
  buttonOptions = {
    text: 'RESET',
    type: 'normal',
    width: '180',
    useSubmitBehavior: true,
  };
  
   onFormSubmit(e:Event) {
    e.preventDefault();
    this.resetCode.newPassword = this.formData.Password;
    this._userService.resetPassword(this.resetCode).subscribe({
      next: (data)=>{
        this._toasterService.showToaster('Password changed!', 'success')
        this.resetCodeChange.emit(new ResetCode());
        this.formStateEvent.emit("login");
      },
      error: (err) =>{
        this._toasterService.showToaster('Failed to cahnge password!','error')
        // console.log(err);        
      }
    });
  }


}

