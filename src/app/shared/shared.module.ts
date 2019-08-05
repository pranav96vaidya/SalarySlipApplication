import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INRCurrencyPipe } from './inrcurrency.pipe';
import { DataNotFoundComponent } from './data-not-found/data-not-found.component';

@NgModule({
  declarations: [INRCurrencyPipe, DataNotFoundComponent],
  imports: [
    CommonModule
  ],
  exports: [INRCurrencyPipe, DataNotFoundComponent]
})
export class SharedModule { }
