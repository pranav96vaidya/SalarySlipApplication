import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./dashboard/dashboard.module').then(n => n.DashboardModule) },
  { path: 'employee/:empId/salarySlips',
   loadChildren: () => import('./monthly-salary-list/monthly-salary-list.module').then(n => n.MonthlySalaryListModule)},
  { path: 'employee/:empId/salarySlip/view',
   loadChildren: () => import('./salary-slip/salary-slip.module').then(n => n.SalarySlipModule)},
  { path: 'uploadSalarySlip', loadChildren: () => import('./file-upload/file-upload.module').then(n => n.FileUploadModule)},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
