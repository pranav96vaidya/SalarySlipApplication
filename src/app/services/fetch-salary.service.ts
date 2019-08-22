import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FetchSalaryService {

  baseUrl = environment.baseUrl;
  constructor(private readonly http: HttpClient) { }

  public fetchSalary(empId: string, month: string, year: string) {
  const url1 = `${this.baseUrl}/rest/admin/company_detail`;
  const url = `${this.baseUrl}/rest/employee/salary_slips?empID=${empId}&month=${month}&year=${year}`;
  let companyResponse = this.http.get(url1);
  let salaryResponse = this.http.get(url);
  return forkJoin([companyResponse, salaryResponse])
  }

}


