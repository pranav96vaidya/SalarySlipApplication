import { Component, OnInit, Inject, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FetchSalaryService } from '../services/fetch-salary.service';

@Component({
  selector: 'app-salary-slip',
  templateUrl: './salary-slip.component.html',
  styleUrls: ['./salary-slip.component.scss']
})
export class SalarySlipComponent implements OnInit {
  salaryItemsInfo = [
    { beProp: 'employeeFullName', label: 'Name'}, { beProp: 'employeeDesignation', label: 'Designation'},
    { beProp: 'basic', label: 'Basic', isAmount: true} , { beProp: 'professionalTax', label: 'Professional Tax'},
    { beProp: 'hra', label: 'HRA', isAmount: true},
    { beProp: 'tds', label: 'TDS', isAmount: true}, {  beProp: 'lta', label: 'LTA', isAmount: true},
    { beProp: 'esic', label: 'ESIC', isAmount: true},
    { beProp: 'advanceBonus', label: 'Advance Bonus', isAmount: true} ,
    { beProp: 'pf', label: 'PF', isAmount: true},
    { beProp: 'advanceGratuity', label: 'Advance Gratuity', isAmount: true}, { beProp: null},
    { beProp: 'professionalAllowance', label: 'Professional Allowance', isAmount: true}, { beProp: null},
    { beProp: 'grossSalary', label: 'Gross Salary', isAmount: true},
    { beProp: 'totalDeductions', label: 'Total Deductions', isAmount: true},
    { beProp: 'netSalaryPayable', label: 'Net Salary Payable Rs', isHeading: true, isAmount: true},
    { beProp: 'bankName', label: 'Bank'}, { beProp: 'accountNo', label: 'Account No'},
    { beProp: 'ifscNo', label: 'IFSC'}, { beProp: 'esicNo', label: 'ESIC No'}, { beProp: 'pfUAN', label: 'PF UAN'}
  ];

  salaryDisplayItems;
  month = new Date().getMonth();
  months: string[] = ['january', 'february', 'march', 'april', 'may',
    'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  currentMonth = this.months[this.month];
  currentMonthNum = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();
  currentMonthDays: number;
  empId: string;
  selectedMonth: string;
  selectedYear: string;
  fetchDone = false;
  responseData: any;
  noResponse = false;
  monthNumber: number;

  constructor(private router: Router, private title: Title, private route: ActivatedRoute, private fetchService: FetchSalaryService) { }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
    this.title.setTitle('Salary Slip');
    this.route.params.subscribe(data => {
      this.empId = data.empId;
    });

    this.route.queryParams.subscribe(params => {
      this.selectedMonth = params.month;
      this.selectedYear = params.year;
    });

    this.fetchService.fetchSalary(this.empId, this.selectedMonth, this.selectedYear)
    .subscribe(res => {
      if (res['data'].length) {
        this.responseData = res['data'][0];
        this.salaryDisplayItems = [];
        for (let i = 0; i < this.salaryItemsInfo.length; i++) {
          const itemInfo = this.salaryItemsInfo[i];
          this.salaryDisplayItems.push({
            itemLabel: itemInfo.label || itemInfo.beProp,
            itemValue: this.responseData[itemInfo.beProp],
            isHeading: itemInfo.isHeading,
            isAmount: itemInfo.isAmount
          });
        }
        this.salaryDisplayItems.splice(2, 0, { itemLabel: 'Earnings', itemValue: 'Amount Rs', isHeading: true},
        { itemLabel: 'Deductions', itemValue: 'Amount Rs', isHeading: true});
        console.log(res);
        for(let i = 1; i <= this.months.length; i++) {
          if(this.months[i] == this.responseData.month)  {
            this.monthNumber = i;
          }
        }
        this.currentMonthDays = new Date(Number(this.responseData.year), this.monthNumber + 1, 0).getDate();
        this.fetchDone = true;
        this.noResponse = false;
      } else {
        this.fetchDone = true;
        this.noResponse = true;
      }
    }, error => {
      console.log(error);
      this.fetchDone = true;
    });
  }

  public download(): void {
    window.print();
  }

  public sendMail(): void {
    console.log('mail sent');
  }

  public previousPage(): void {
    this.router.navigate([`/employee/${this.empId}/salarySlips`]);
  }
}