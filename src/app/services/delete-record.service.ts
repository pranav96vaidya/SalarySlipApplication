import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteRecordService {
  baseUrl = environment.baseUrl;
  monthObj = environment.monthObj;

  constructor(private readonly http: HttpClient) { }

  public removeRecord(empList): Observable<any> {
    const monthObj = this.monthObj[empList[0]['month']];
    const yearObj = empList[0]['year'];
    console.log(empList);
    let empEmails = [];
    if(empList.length) {
      for(let i = 0; i < empList.length; i++) {
        console.log(empList[i]['employeeEmail']);
        empEmails.push(empList[i]['employeeEmail']);
      }
      console.log(empEmails);
      console.log(yearObj);
      console.log(monthObj);
      const url = `${this.baseUrl}/rest/admin/remove_salary_slip?month=${monthObj}&year=${yearObj}&empEmails=${empEmails}`;
      return this.http.delete(url);
    } else {
      return throwError("employee list is null");
    }
  }
}
