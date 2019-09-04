import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { StartupService } from '../services/startup.service';

@Component({
  selector: 'app-monthly-salary-list',
  templateUrl: './monthly-salary-list.component.html',
  styleUrls: ['./monthly-salary-list.component.scss']
})

export class MonthlySalaryListComponent implements OnInit {
  navigateUrl = environment.navigateUrl;
  currentMonthIndex = new Date().getMonth();
  months = environment.months;
  monthObj = environment.monthObj;
  currentMonth = this.months[this.currentMonthIndex];
  currentYear = new Date().getFullYear();
  years: number[] = [];
  empId: string;
  empName: string;
  employeeForm: FormGroup;
  fetchDone: boolean;
  searchDone= true;
  errorMsg: string;
  noData: boolean;
  empData: any;
  year: any;
  noDataForYear = true;
  empRoleData: any;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly title: Title, private readonly apiService: ApiService,
    private startupService: StartupService) { }

  ngOnInit(): void {
    this.fetchDone = false;
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
    for (let i = 2017; i <= this.currentYear; i++) {
      this.years.push(i);
    }
    this.title.setTitle('Salary Slip records');
    this.route.params.subscribe(data => {
      this.empId = data['empId'];
    });
    this.route.queryParams.subscribe(queryData => {
      this.year = queryData['year'];
    });

    this.empRoleData = this.startupService.startupData();
    this.getData(this.empId, this.year);
    let year = this.year ? this.year : this.currentYear;
    this.employeeForm = new FormGroup({
      yearVal: new FormControl(year)
    });
  }

  public getData(empId, year) {
    if (this.empRoleData['status'] == 'admin') {
      this.apiService.getEmpdetail(empId, year)
      .subscribe(res => {
        if (res[0]['data']) {
          this.empName = res[0]['data']['fullName'];
        } else {
          this.errorMsg = "Employee not exist";
          this.fetchDone = true;
          this.noDataForYear = true;
          this.searchDone = false;
        }
        if (res[1]['data'].length === 0) {
          this.fetchDone = true;
          this.noDataForYear = true;
          this.searchDone = true;
        } else {
          this.empData = res[1]['data'];
          this.fetchDone = true;
          this.noDataForYear = false;
          this.searchDone = true;
        }
      }, err =>  {
        if (err.error) {
          this.errorMsg = err.error.customMsg;
          this.fetchDone = true;
          this.searchDone = true;
        } else {
          this.errorMsg = 'Something went wrong!';
          this.fetchDone = true;
          this.searchDone = true;
        }
      });
    } else {
      this.empName = this.empRoleData['fullName'];
      this.apiService.getEmpSalarydetail(this.empId, this.year)
      .subscribe(resp => {
        if (resp['data'].length === 0) {
          this.fetchDone = true;
          this.noDataForYear = true;
          this.searchDone = true;
        } else {
          this.empData = resp['data'];
          this.fetchDone = true;
          this.noDataForYear = false;
          this.searchDone = true;
        }
      }, err =>  {
        if (err.error) {
          this.errorMsg = err.error.customMsg;
          this.fetchDone = true;
          this.searchDone = true;
        } else {
          this.errorMsg = 'Something went wrong!';
          this.fetchDone = true;
          this.searchDone = true;
        }
      });
    }
  }

  public onSubmit(): void {
    this.searchDone = false;
    this.router.navigate([`/employee/${this.empId}/salarySlips`],
      { queryParams: { year: this.employeeForm.value.yearVal}});
    this.getData(this.empId, this.employeeForm.value.yearVal);
  }

  public getSalary(year: number, month): void {
    let monthVal = this.months[month - 1];
    window.open(`${this.navigateUrl}/employee/${
    this.empId}/salarySlip/view?month=${monthVal.toLowerCase()}&year=${year}` , '_blank');
  }

  public previousPage(): void {
    this.router.navigate(['/home']);
  }
}
