import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  baseUrl = environment.baseUrl;
  constructor(private readonly http: HttpClient) { }
  // token = this.readCookie('token');
  // heroku server token
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVTBERFlVTlNEIiwic3RhdHVzIjoiYWRtaW4iLCJpYXQiOjE1NjY1NTA4MjcsImV4cCI6MTU3NzM1MDgyN30.ODwU0bV_ZH-bO70mYpMaMrbRUHLbZQpLH4ZmO_g_Lkk';
  // timesheet server
  // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVTBERFlVTlNEIiwic3RhdHVzIjoiYW
  // RtaW4iLCJpYXQiOjE1NjQ1NzE4OTEsImV4cCI6MTU2NDU3NTQ5MX0.xUdc1mWq-9REmytjDFGRWxz9eOK4YeBpp0meKH7Cd5U";
  getToken(): string {
    return this.token;
  }

  public readCookie(name): string {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
  }

  public isLoggedIn(): boolean {
    return this.token != null;
  }

}