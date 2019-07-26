import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  // token = this.readCookie('token');
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVTBERFlVTlNEIiwic3RhdHVzIjoiYWRtaW4iLCJpYXQiOjE1NjM4NzgzNzcsImV4cCI6MTU2NTE3NDM3N30.ROTZK9l5dWPUmaUpzfLVnHFVhVyb1Y6lGuwl2e3XvT4";

  getToken(): string {
    // console.log(this.token);
    return this.token;
  }
  
  readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) {
          return c.substring(nameEQ.length,c.length);
        } 
    }
    return null;
  }
  // isLoggedIn() {
  //   const token = this.getToken();
  //   return token != null;
  // }

  isLoggedIn() {
    return this.token !=null;
  }

  // login(email: string, password: string): Observable<any> {
  //   return this.http.post(this.baseUrl + "/rest/auth/login", {email,password});
  // }
}