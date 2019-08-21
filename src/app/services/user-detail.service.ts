import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserDetailService {
  baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) { }

  public getDetail(): Observable<any> {
    const url = `${this.baseUrl}/rest/employee/detail`;
    return this.http.get(url);
  }

  public getEmployeeList(): Observable<any> {
    const url = `${this.baseUrl}/rest/admin/employees`;
    return this.http.get(url);
  }

}