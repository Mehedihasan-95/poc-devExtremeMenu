import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResetCode } from 'src/app/models/Users';
import { ToasterService } from 'src/app/Services/toastr.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  @Input() resetCode: ResetCode;
  
  @Output() formStateEvent = new EventEmitter<string>();
  @Output() resetCodeChange = new EventEmitter();

  loading = false;
  formData: any = {otp:""};

  constructor(private _userService: UserService, private _toasterService: ToasterService) { }

  ngOnInit(): void {
  }

  namePattern: any = /^[a-zA-Z0-9]+$/;

  buttonOptions = {
    text: 'VERIFY',
    type: 'normal',
    width: '180',
    useSubmitBehavior: true,
  };

  onFormSubmit(e:any) {
    e.preventDefault();
    this._userService.verifyResetCode(this.resetCode.userEmail, this.formData.otp).subscribe({
      next: (data)=>{
        this._toasterService.showToaster('Verified!', 'success')
        // console.log(data);
        this.resetCodeChange.emit(data);
        this.formStateEvent.emit("resetPass")
      },
      error: (err)=>{
        this._toasterService.showToaster('Invalid OTP Code!', 'error')
        // console.log(err);
      }
    });
  }

}
