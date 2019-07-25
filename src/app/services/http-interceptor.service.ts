import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(public auth: AuthenticationService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    let authReq = req;
    // console.log(authReq.url);
    let token = this.auth.getToken();
    if (token) {
      authReq = req.clone({ headers: req.headers.set('token', token)});
    }

    return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // console.log(event);
      }
    }, (err: any) => {
      console.log(err);
        if (err instanceof HttpErrorResponse) {
          console.log(err);
          if (err.status == 400 || err.status == 401) {
            this.auth.token = null;
            location.href="http://newput.timetracker.s3-website-us-west-1.amazonaws.com/login";
          }
            // console.log(this.auth.token);
          // }
        }
      }
    ));
    // return next.handle(authReq).pipe(tap(
    //   event => {
    //     console.log(event);
    //   },
    //   (err: any) => {
    //     console.log("error" + err);
    //     if (err instanceof HttpErrorResponse) {
    //       console.log(err);
    //       console.log('req url :: ' + req.url);
    //       if (err.status === 402) {
    //         this.auth.cookie = null;
    //         console.log(this.auth.cookie);
    //         this.router.navigate(['']);
    //       }
    //     }
    //   }
    // ));
  }
}