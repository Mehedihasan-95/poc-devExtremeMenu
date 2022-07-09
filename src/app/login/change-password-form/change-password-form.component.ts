import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidationCallbackData } from 'devextreme/ui/validation_rules';
import { ResetCode } from 'src/app/models/Users';
import { ToasterService } from 'src/app/Services/toastr.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-change-passsword-form',
  templateUrl: './change-password-form.component.html'
})
export class ChangePasswordFormComponent implements OnInit {
  

  loading = false;
  formData: any = {email:""};
  recoveryCode: string = '';
  @Input() resetCode: ResetCode;

  @Output() formStateEvent = new EventEmitter<string>();
  @Output() resetCodeChange = new EventEmitter();

  
  constructor( private _userService: UserService, private _toasterService: ToasterService) { }

  ngOnInit() {

  }

  buttonOptions = {
    text: 'RESET',
    type: 'normal',
    width: '180',
    useSubmitBehavior: true,
  };

  onLoginPage(state:string){ 
    this.formStateEvent.emit(state)
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this._userService.getResetCode(this.formData.email).subscribe({
      next:(data)=>{
        this._toasterService.showToaster('Reset code send. Please check your email', 'success')
        // console.log(data);
        this.resetCode.userEmail = this.formData.email;
        this.resetCodeChange.emit(this.resetCode);
        this.onLoginPage('otp')        
      },
      error:(err)=>{
        this._toasterService.showToaster('Invalid email address!! ', 'error')
        console.log(err);
        
      }
    })
  }
  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.formData.password;
  }
}

