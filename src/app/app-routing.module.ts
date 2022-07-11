import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { TasksComponent } from './pages/tasks/tasks.component';
const routes: Routes = [
  {
    path: 'task',
    component: TasksComponent
    },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxDataGridModule, DxFormModule],
  exports: [RouterModule],
  providers: [
    AuthGuardService
  ],
  declarations: [
    HomeComponent
  ]
})
export class AppRoutingModule { }
