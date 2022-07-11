import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Router } from '@angular/router';
// import { Globals } from '../login-form/login-form.component';
import { UserSessionStoreService } from 'src/app/Services/user-session-store.service';
import { StoreKeys } from 'src/app/Services/store-keys';
import { User } from 'src/app/models/Users';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  user: User;

  userMenuItems = [{
    text: 'Profile',
    icon: 'user',
    onClick: () => {
      this.router.navigate(['/profile']);
    }
  },
  {
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      this._sessionService.saveAccessToken("");
      this._sessionService.saveActiveUser(null);
      this._sessionService.setStoreValue(StoreKeys.NAVIGATION, null);
    }
  }];

  constructor(private router: Router, private _sessionService: UserSessionStoreService) { }

  ngOnInit() {
    this.user = this._sessionService.getStoreValue(StoreKeys.ACTIVE_USER);
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}
