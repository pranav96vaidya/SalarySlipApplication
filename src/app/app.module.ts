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
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
// import { HttpInterceptorService } from './services/http-interceptor.service';
// import { AuthenticationGuardService } from './services/authentication-gurad.service';
// import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SalarySlipComponent,
    FooterComponent,
    SalaryListComponent,
    EmployeeSalaryComponent,
    PageNotFoundComponent,
    NavComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
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
