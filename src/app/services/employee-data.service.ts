import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  emp;
  constructor() { }

  getEmpDetail() {
    return this.emp;
  }

  setEmpDetail(emp) {
    this.emp = emp;
    console.log(this.emp);
  }
}
