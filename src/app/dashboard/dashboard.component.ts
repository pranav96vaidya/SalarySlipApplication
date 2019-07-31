import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  isAuthenticated: boolean = false;
  fetchDone = false;
  users: string;
  employeeList: string;
  month = new Date().getMonth();
  months: string[] = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"];
  currentMonth = this.months[this.month];
  currentYear = new Date().getFullYear();
  years: number[]= [];
  employeeForm: FormGroup;
  selectedEmp: {};
  errorMsg: string;

  constructor(private userService: UserDetailService, private router: Router,
    private title: Title) {
    // this.getState = this.store.select(selectAuthenticationState);
  };

  ngOnInit() {
    this.title.setTitle('Home Page');
    for(var i=2017; i<= this.currentYear; i++) {
      this.years.push(i);
    };
    this.userService.getEmployeeList().pipe(retry(2)).subscribe(responseList => {
      console.log(responseList);
      this.users = responseList['data'];
      this.fetchDone = true;
    }, err =>  {
        this.errorMsg = err.error.customMsg;
        this.fetchDone = true;
    })
    this.employeeForm = new FormGroup({
      'emp': new FormControl('', Validators.required),
      'yearVal': new FormControl(this.currentYear),
      'monthVal': new FormControl(this.currentMonth)
    });
  };

  onSubmit() {
    this.router.navigate(['/employee', this.employeeForm.value.emp.id,'salarySlip', 'view'], 
    { queryParams: { month: this.employeeForm.value.monthVal, year: this.employeeForm.value.yearVal}});
  }

  fetchSalarySlip(emp) {
    this.router.navigate(['/employee',emp.id,'salarySlips']);
  }

  uploadSalary() {
    this.router.navigate(['/uploadSalarySlip']);
  }
}