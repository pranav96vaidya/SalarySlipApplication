import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailService {
  baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) { }

  public getEmpdetail(id: any): Observable<any> {
    const url = `${this.baseUrl}/rest/employee/salary_slips?empID=${id}`;
    return this.http.get(url);
  }
}
