import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {
  baseUrl = environment.baseUrl;
  monthObj = environment.monthObj;

  constructor(private readonly http: HttpClient) { }

  public sendMailToEmployees(empList, month, year) {
    console.log(empList);
    console.log(year);
    const monthObj = this.monthObj[month];
    console.log(monthObj);
    if(empList.length) {
      const url = `${this.baseUrl}/rest/admin/send_email?month=${monthObj}&year=${year}&empEmails=${empList}`;
      return this.http.get(url);
    } else {
      return throwError("employee list is null");
    }
  }
}
