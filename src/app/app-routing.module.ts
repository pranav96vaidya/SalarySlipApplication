import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuardService } from './services/authentication-guard.service';
import { LoginComponent } from './login/login.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
// import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalarySlipComponent } from './salary-slip/salary-slip.component';
import { SalaryListComponent } from './salary-list/salary-list.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent, canActivate: [AuthenticationGuardService] },
  { path: 'employee/:empId', component: SalaryListComponent, canActivate: [AuthenticationGuardService]},
  // { path: 'home', component: FileUploadComponent, canActivate: [AuthenticationGuardService]}
  { path: 'employee/:empId/salarySlip/:id', component: SalarySlipComponent, canActivate: [AuthenticationGuardService]},
  { path: 'uploadSalarySlip', component: FileUploadComponent, canActivate: [AuthenticationGuardService] },
  { path: 'employeeSalary', component: EmployeeSalaryComponent, canActivate: [AuthenticationGuardService] },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //forRoot(routes, { enableTracing: true })
  exports: [RouterModule]
})
export class AppRoutingModule { }
