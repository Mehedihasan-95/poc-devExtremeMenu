import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent } from './login';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { MeasurementUnitComponent } from './pages/master-data/measurement-unit/measurement-unit.component';
import { TariffRateComponent } from './pages/master-data/tariff-rate/tariff-rate.component';
import { FeatureListComponent } from './pages/master-data/feature-list/feature-list.component';
import { FeatureAssignComponent } from './pages/master-data/feature-assign/feature-assign.component';
import { RoleListComponent } from './pages/master-data/role-list/role-list.component';
import { StatusCodeManagementComponent } from './pages/master-data/status-code-management/status-code-management.component';
import { WaterRequisitionReportComponent } from './pages/reports/water-requisition-report/water-requisition-report.component';
import { UserInfoComponent } from './pages/user-management/user-info/user-info.component';
import { WaterRequisitionComponent } from './pages/water-requisition/water-requisition/water-requisition.component';
import { AssignScheduleComponent } from './pages/water-requisition/assign-schedule/assign-schedule.component';
import { WaterDistributionComponent } from './pages/water-requisition/water-distribution/water-distribution.component';
import { WaterDistributionReportComponent } from './pages/reports/water-distribution-report/water-distribution-report.component';
import { PaymentCollectionReportComponent } from './pages/reports/payment-collection-report/payment-collection-report.component';

const routes: Routes = [
  {
    path: 'reports/water-distribution',
    component: WaterDistributionReportComponent,
  },
  {
    path: 'reports/payment-collection',
    component: PaymentCollectionReportComponent,
  },
  {
    path: 'reports/water-requisition',
    component: WaterRequisitionReportComponent,
  },
  {
    path: 'water-requisition/assign-schedule',
    component: AssignScheduleComponent,
  },
  {
    path: 'water-distribution',
    component: WaterDistributionComponent,
  },
  {
    path: 'water-requisition',
    component: WaterRequisitionComponent,
  },
  {
    path: 'user-list',
    component: UserInfoComponent,
  },
  {
    path: 'status-code-management',
    component: StatusCodeManagementComponent,
  },
  {
    path: 'role-list',
    component: RoleListComponent,
  },
  {
    path: 'feature-list',
    component: FeatureListComponent,
  },
  {
    path: 'feature-assign',
    component: FeatureAssignComponent,
  },
  {
    path: 'measurement-unit',
    component: MeasurementUnitComponent,
  },
  {
    path: 'tariff-rate',
    component: TariffRateComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [AuthGuardService]
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
    HomeComponent,
    ProfileComponent,
    TasksComponent
  ]
})
export class AppRoutingModule { }
