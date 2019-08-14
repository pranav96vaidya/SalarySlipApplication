import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FetchSalaryService {

  baseUrl = environment.baseUrl;
  constructor(private readonly http: HttpClient) { }

  public fetchSalary(empId: string, month: string, year: string): Observable<any> {
    const url = `${this.baseUrl}/rest/employee/salary_slips?empID=${empId}&month=${month}&year=${year}`;
    return this.http.get(url);
  }

}


