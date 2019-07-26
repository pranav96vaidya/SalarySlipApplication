import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  currentYear = new Date().getFullYear();
  years: number[]= [];
  empId: string;
  empName: string;
  fetchDone = false;
  errorMsg: string;

  constructor(private router: Router, private route: ActivatedRoute, private state: Router,
    private title: Title, private empDetails: EmployeeDetailService) { }

  ngOnInit() {
    for(var i=2017; i<= this.currentYear; i++) {
      this.years.push(i);
    }
    this.title.setTitle('Salary Slip records');
    this.route.params.subscribe(data => {
      this.empId = data['empId'];
    });

    this.empDetails.getEmpdetail(this.empId)
    .subscribe(response => {
      if(!response['data']) {
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
