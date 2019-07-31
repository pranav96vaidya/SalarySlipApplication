import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalarySlipRoutingModule } from './salary-slip-routing.module';
import { SalarySlipComponent } from './salary-slip.component';

@NgModule({
  declarations: [ SalarySlipComponent ],
  imports: [
    CommonModule,
    SalarySlipRoutingModule
  ]
})
export class SalarySlipModule { }
