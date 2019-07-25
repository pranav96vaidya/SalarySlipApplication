import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDetailService } from '../services/user-detail.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeDataService } from '../services/employee-data.service';
import { EmployeeDetailService } from '../services/employee-detail.service';


// import { User } from './../../models/user';
// import { AppState, selectAuthenticationState } from './../../store/app.state';
// import { Logout } from './../../store/actions/authentication.actions';
// import { UserService } from 'src/app/services/user.service';
// import { FileUploadService } from 'src/app/services/file-upload.service';

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
  years: number[] = [2017, 2018, 2019];
  currentYear = new Date().getFullYear();
  employeeForm: FormGroup;
  selectedEmp: {};
  errorMsg: string;

  constructor(private userService: UserDetailService, private route: Router,
    private title: Title, private empData: EmployeeDataService, private empDetails: EmployeeDetailService) {
    // this.getState = this.store.select(selectAuthenticationState);
  }

  ngOnInit() {
    // console.log(this.route);
    this.title.setTitle('Home Page');
    this.userService.getEmployeeList().subscribe(responseList => {
      console.log(responseList);
      this.users = responseList['data'];
      // this.empName = this.responseData2['data'];
      // console.log(response['data']);
      this.fetchDone = true;
    }, err =>  {
        this.errorMsg = err.error.customMsg;
        // console.log(err);
        this.fetchDone = true;
    })
    // this.employeeList = JSON.parse(localStorage.getItem("employee"));
    // this.users = this.employeeList['data'];
    // console.log(this.currentMonth);
    this.employeeForm = new FormGroup({
      'emp': new FormControl('', Validators.required),
      'yearVal': new FormControl(this.currentYear),
      'monthVal': new FormControl(this.currentMonth)
    })

    // this.employeeForm.controls['emp'].valueChanges.subscribe((value) => {
    //   this.selectedEmp = value;
    // });
  }

  onSubmit() {
    console.log(this.employeeForm.value);
    this.route.navigate(['/employee', this.employeeForm.value.emp.id, 'salarySlip', this.employeeForm.value.emp.id ]);
  }

  fetchSalarySlip(emp) {
    console.log(emp.id);

    // this.empData.setEmpDetail(emp);
    // console.log(emp.fullName);
    this.route.navigate(['/employee', emp.id]);
  }

  uploadSalary() {
    this.route.navigate(['/uploadSalarySlip']);
  }
}