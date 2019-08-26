import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
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

  public getEmpdetail(id: any): Observable<any> {
    const url = `${this.baseUrl}/rest/employee/salary_slips?empID=${id}`;
    return this.http.get(url);
  }

  public fetchSalary(empId: string, month: string, year: string) {
    const url1 = `${this.baseUrl}/rest/admin/company_detail`;
    const url = `${this.baseUrl}/rest/employee/salary_slips?empID=${empId}&month=${month}&year=${year}`;
    let companyResponse = this.http.get(url1);
    let salaryResponse = this.http.get(url);
    return forkJoin([companyResponse, salaryResponse])
  }

  public sendFile(formData): Observable<any> {
    const url = `${this.baseUrl}/rest/admin/upload`;
    return this.http.post(url, formData);
  }

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

  public getDetail(): Observable<any> {
    const url = `${this.baseUrl}/rest/employee/detail`;
    return this.http.get(url);
  }

  public getEmployeeList(): Observable<any> {
    const url = `${this.baseUrl}/rest/admin/employees`;
    return this.http.get(url);
  }

}