import { Injectable } from '@angular/core';
import { Observable, forkJoin } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserDetailService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getDetail(): Observable<any> {
    let url = this.baseUrl + '/rest/employee/detail';
    return this.http.get(url);
  }

  getEmployeeList(): Observable<any> {
    let url = this.baseUrl + '/rest/admin/employee';
    return this.http.get(url);
  }
}