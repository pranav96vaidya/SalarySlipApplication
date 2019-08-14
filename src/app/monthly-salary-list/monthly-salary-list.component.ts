import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { EmployeeDetailService } from '../services/employee-detail.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-monthly-salary-list',
  templateUrl: './monthly-salary-list.component.html',
  styleUrls: ['./monthly-salary-list.component.scss']
})

export class MonthlySalaryListComponent implements OnInit {
  navigateUrl = environment.navigateUrl;
  currentMonthIndex = new Date().getMonth();
  months: string[] = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentMonth = this.months[this.currentMonthIndex];
  currentYear = new Date().getFullYear();
  years: number[] = [];
  empId: string;
  empName: string;
  fetchDone = false;
  errorMsg: string;
  noData: boolean;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly title: Title, private readonly empDetailService: EmployeeDetailService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    for (let i = 2017; i <= this.currentYear; i++) {
      this.years.push(i);
    }
    this.title.setTitle('Salary Slip records');
    this.route.params.subscribe(data => {
      this.empId = data['empId'];
    });

    this.empDetailService.getEmpdetail(this.empId)
    .subscribe(response => {
      if (response['data'].length == 0) {
        this.fetchDone = true;
        this.noData = true;
      }
      console.log(response);
      this.empName = response['data'][0]['employeeFullName'];
      this.fetchDone = true;
      }, err =>  {
        this.errorMsg = err.error.customMsg;
        console.log(err);
        this.fetchDone = true;
    });
  }

  public getSalary(year: number, month: string): void {
    window.open(`${this.navigateUrl}/employee/${
    this.empId}/salarySlip/view?month=${month.toLowerCase()}&year=${year}`);
  }

  public previousPage(): void {
    this.router.navigate(['/home']);
  }

}
