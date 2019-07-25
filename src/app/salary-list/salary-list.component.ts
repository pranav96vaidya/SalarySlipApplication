import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeDataService } from '../services/employee-data.service';
import { Title } from '@angular/platform-browser';
import { EmployeeDetailService } from '../services/employee-detail.service';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.scss']
})

export class SalaryListComponent implements OnInit {
  currentMonthIndex = new Date().getMonth();
  months: string[] = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"];
  currentMonth = this.months[this.currentMonthIndex];
  years: number[] = [2019, 2018, 2017];
  empId: string;
  empName: string;
  fetchDone = false;
  errorMsg: string;


  constructor(private router: Router, private route: ActivatedRoute, private state: Router,
    private title: Title, private empDetails: EmployeeDetailService) { }

  ngOnInit() {
    this.title.setTitle('Salary Slip records');
    // this.empName = this.emp.fullName;
    console.log(this.state);
    console.log(this.route);
    this.route.params.subscribe(data => {
      this.empId = data['empId'];
      console.log(data);
    });

    this.empDetails.getEmpdetail(this.empId)
    .subscribe(response => {
      console.log(response);
      if(response['data'] == null) {
        console.log("null data");
        this.router.navigate(['home']);
      }
      this.empName = response['data']['fullName'];
      this.fetchDone = true;
      }, err =>  {
        this.errorMsg = err.error.customMsg;
        console.log(err);
        this.fetchDone = true;
    })
  }

  getSalary() {
    console.log(this.empId);
    this.router.navigate(['/employee',this.empId, 'salarySlip', this.empId]);
  }

  previousPage() {
    this.router.navigate(['/home']);
  }

}
