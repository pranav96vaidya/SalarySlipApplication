import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';
import { StartupService } from './services/startup.service';

export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PageNotFoundComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
