import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  baseUrl = environment.baseUrl;
  constructor(private readonly http: HttpClient) { }
  token = this.readCookie('token');
  // heroku server token
  // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVUhSNU5VRFVZIiwic3RhdHVzIjoiZW1wbG95ZWUiLCJpYXQiOjE1NjY1NjUxMDAsImV4cCI6MTU3NzM2NTEwMH0.K4qVCn2MbmBaSvcK2cXnAejVdos0Qb1-vk7m2ia_0rc';
  // timesheet server
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