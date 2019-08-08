import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDetailService } from '../services/user-detail.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  empName: string;
  getState: Observable<any>;
  isAuthenticated: boolean;
  fetchDone = false;
  users: string;
  employeeList: string;
  month = new Date().getMonth();
  months: string[] = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentMonth = this.months[this.month];
  currentYear = new Date().getFullYear();
  years: number[] = [];
  employeeForm: FormGroup;
  selectedEmp: {};
  errorMsg: string;

  constructor(private readonly userService: UserDetailService, private readonly router: Router, private readonly title: Title) {
    // this.getState = this.store.select(selectAuthenticationState);
  }

  ngOnInit(): void {
    this.isAuthenticated = false;
    this.title.setTitle('Home Page');
    for (let i = 2017; i <= this.currentYear; i++) {
      this.years.push(i);
    };
    this.userService.getEmployeeList().pipe(retry(2)).subscribe(responseList => {
      console.log(responseList)
      this.users = responseList['data'];
      this.fetchDone = true;
    }, err =>  {
        this.errorMsg = err.error.customMsg;
        this.fetchDone = true;
    });
    this.employeeForm = new FormGroup({
      emp: new FormControl('', Validators.required),
      yearVal: new FormControl(this.currentYear),
      monthVal: new FormControl(this.currentMonth)
    });
  }

  public onSubmit(): void {
    this.router.navigate([`/employee/${this.employeeForm.value.emp.id}/salarySlip/view`],
    { queryParams: { month: this.employeeForm.value.monthVal.toLowerCase(), year: this.employeeForm.value.yearVal}});
  }

  public fetchSalarySlip(emp: {}): void {
    this.router.navigate([`/employee/${emp['id']}/salarySlips`]);
  }

  public uploadSalary(): void {
    this.router.navigate(['/uploadSalarySlip']);
  }

}