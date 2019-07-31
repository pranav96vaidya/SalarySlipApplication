import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { MonthlySalaryListRoutingModule } from './monthly-salary-list-routing.module';
import { MonthlySalaryListComponent } from './monthly-salary-list.component';

@NgModule({
  declarations: [MonthlySalaryListComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MonthlySalaryListRoutingModule
  ]
})
export class MonthlySalaryListModule { }
