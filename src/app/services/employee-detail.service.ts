import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getEmpdetail(id: any) {
    let url = this.baseUrl + '/rest/employee/detail/' + id;
    return this.http.get(url);
  }

  
}
