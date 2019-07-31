import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalarySlipComponent } from './salary-slip/salary-slip.component';
import { FooterComponent } from './footer/footer.component';
import { SalaryListComponent } from './salary-list/salary-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';
import { DragDropDirective } from './drag-drop.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SalarySlipComponent,
    FooterComponent,
    DragDropDirective,
    SalaryListComponent,
    PageNotFoundComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
