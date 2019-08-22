import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { FetchSalaryService } from '../services/fetch-salary.service';
import { environment } from 'src/environments/environment';
import { SendmailService } from '../services/sendmail.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  salaryDisplayItems= [];
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

  constructor(private router: Router, private title: Title, private route: ActivatedRoute, private fetchService: FetchSalaryService,
    private sanitizer: DomSanitizer, private readonly sendMailService: SendmailService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.currentMonth = this.months[this.month];
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
      console.log(res);
      this.baseUrl = 'data:image/png;base64,';
      this.companyDetails = res[0]['data'];
      this.companySealImg = this.getSantizeUrl(this.baseUrl + this.companyDetails['companySeal']);
      this.directorSignImg = this.getSantizeUrl(this.baseUrl + this.companyDetails['directorSign']);
      this.responseData = res[1]['data'][0];
      if (res[1]['data'].length) {
        this.responseData = res[1]['data'][0];
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
        this.monthNumber = this.monthObj[this.responseData.month];
        this.currentMonthDays = new Date(Number(this.responseData.year), this.monthNumber, 0).getDate();
        this.fetchDone = true;
        this.noResponse = false;
      } else {
        this.fetchDone = true;
        this.noResponse = true;
      }
    })
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public download(): void {
    window.print();
  }

  public sendMail(): void {
    // console.log(this.responseData);
    console.log(this.responseData['month']);
    console.log(this.responseData['year']);
    let empList = [];
    empList.push(this.responseData['employeeEmail']);
    console.log(empList);
    this.sendMailService.sendMailToEmployees(empList, this.responseData['month'], this.responseData['year'])
    .subscribe(res => {
      console.log(res);
      this.modalResponse = res['data']['message'];
      this.modalService.open(this.content, { windowClass: 'dark-modal' });
    })
  }

  public previousPage(): void {
    this.router.navigate([`/employee/${this.empId}/salarySlips`]);
  }
}