import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-salary-slip',
  templateUrl: './salary-slip.component.html',
  styleUrls: ['./salary-slip.component.scss']
})
export class SalarySlipComponent implements OnInit {
  salaryItemsInfo = [
    { beProp: 'employeeFullName', label: 'Employee Name'}, { beProp: 'employeeDesignation', label: 'Designation'},
    { beProp: 'basic', label: 'Basic', isAmount: true} , { beProp: 'professionalTax', label: 'Prof Tax'},
    { beProp: 'hra', label: 'HRA', isAmount: true},
    { beProp: 'tds', label: 'TDS', isAmount: true}, {  beProp: 'lta', label: 'LTA', isAmount: true},
    { beProp: 'esic', label: 'ESIC', isAmount: true},
    { beProp: 'advanceBonus', label: 'Advance Bonus', isAmount: true} ,
    { beProp: 'pf', label: 'PF', isAmount: true},
    { beProp: 'advanceGratuity', label: 'Advance Gratuity', isAmount: true}, { beProp: null},
    { beProp: 'professionalAllowance', label: 'Professional Allowance', isAmount: true}, { beProp: null},
    { beProp: 'grossSalary', label: 'Gross Salary', isAmount: true},
    { beProp: 'totalDeductions', label: 'Total Deductions', isAmount: true},
    { beProp: 'netSalaryPayable', label: 'Net Salary Payable', isHeading: true, isAmount: true},
    { beProp: 'bankName', label: 'Bank'}, { beProp: 'accountNo', label: 'Account No'},
    { beProp: 'ifscNo', label: 'IFSC'}, { beProp: 'esicNo', label: 'ESIC No', isNotApplicable: true},
    { beProp: 'pfUAN', label: 'PF UAN', isNotApplicable: true}
  ];

  salaryDisplayItems = [];
  month = new Date().getMonth();
  months = environment.months;
  monthObj = environment.monthObj;
  currentMonth: string;
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
  companyDetails: any;
  companySealImg: any;
  directorSignImg: any;
  baseUrl: string;
  @ViewChild('content', {static: true}) content;
  modalResponse: string;
  modalContent: any;
  responseMonth: any;
  mailSent: boolean;
  errorMsg: any;

  constructor(private router: Router, private title: Title, private route: ActivatedRoute,
    private apiService: ApiService, private sanitizer: DomSanitizer, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.mailSent = true;
    this.currentMonth = this.months[this.month];
    this.title.setTitle('Salary Slip');
    this.route.params.subscribe(data => {
      this.empId = data.empId;
    });

    this.route.queryParams.subscribe(params => {
      this.selectedMonth = this.monthObj[params.month];
      this.selectedYear = params.year;
    });

    this.apiService.fetchSalary(this.empId, this.selectedMonth, this.selectedYear)
    .subscribe(res => {
      this.baseUrl = 'data:image/png;base64,';
      this.companyDetails = res[0]['data'];
      this.companySealImg = this.getSantizeUrl(this.baseUrl + this.companyDetails['companySeal']);
      this.directorSignImg = this.getSantizeUrl(this.baseUrl + this.companyDetails['directorSign']);
      if (res[1]['data'].length) {
        this.responseData = res[1]['data'][0];
        for (let i = 0; i < this.salaryItemsInfo.length; i++) {
          const itemInfo = this.salaryItemsInfo[i];
          this.salaryDisplayItems.push({
            itemLabel: itemInfo.label || itemInfo.beProp,
            itemValue: this.responseData[itemInfo.beProp],
            isHeading: itemInfo.isHeading,
            isAmount: itemInfo.isAmount,
            isNotApplicable: itemInfo.isNotApplicable
          });
        }
        this.responseMonth = this.months[+this.responseData.month - 1];
        this.salaryDisplayItems.splice(2, 0, { itemLabel: 'Earnings', itemValue: 'Amount (Rs)', isHeading: true},
        { itemLabel: 'Deductions', itemValue: 'Amount (Rs)', isHeading: true});
        this.currentMonthDays = new Date(Number(this.responseData.year), this.responseData.month, 0).getDate();
        this.fetchDone = true;
        this.noResponse = false;
      } else {
        this.fetchDone = true;
        this.noResponse = true;
      }
    }, error => {
      this.errorMsg = "Something went wrong while fetching salary slip."
    });
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public download(): void {
    window.print();
  }

  public sendMail(): void {
    this.mailSent = false;
    const empList = [];
    empList.push(this.responseData['employeeEmail']);
    this.apiService.sendMailToEmployees(empList, this.responseData['month'], this.responseData['year'])
    .subscribe(res => {
      if (empList.length === 1) {
        this.modalContent = empList[0];
      } else {
        this.modalContent = 'employees';
      }
      this.modalResponse = res['data']['message'];
      this.modalService.open(this.content, { windowClass: 'dark-modal' });
      this.mailSent = true;
    });
  }

  public previousPage(): void {
    this.router.navigate([`/employee/${this.empId}/salarySlips`]);
  }
}
