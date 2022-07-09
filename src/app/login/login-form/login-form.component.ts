import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ResetCode } from 'src/app/models/Users';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loading = false;
  formData: any = {};
  formState: string = "login";
  resetCode: ResetCode = new ResetCode();
  constructor( private router: Router) { }

  async onSubmit(e: Event) {
   
  }


  logIn() {
    Globals.isLoggedIn = true;
  }
  manageFormState(state:string){
    this.formState= state;
    
  }



}




export class Globals {
  public static isLoggedIn: boolean = false;
}
