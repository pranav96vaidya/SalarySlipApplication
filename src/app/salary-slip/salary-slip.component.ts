import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FetchSalaryService } from '../services/fetch-salary.service';

@Component({
  selector: 'app-salary-slip',
  templateUrl: './salary-slip.component.html',
  styleUrls: ['./salary-slip.component.scss'],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})
export class SalarySlipComponent implements OnInit {
  salaryItemsInfo = [
    {beProp:"name", label:"Name"}, {beProp: "designation", label:"Designation"} , 
    {beProp: "basic", label: "Basic"} , {beProp: "professionalTax", label: "Professional Tax"} ,
    {beProp:"hra", label:"HRA"}, {beProp:"tds", label:"TDS"}, {beProp:"lta", label:"LTA"}, 
    {beProp:"esic", label:"ESIC"}, {beProp: "advanceBonus", label: "Advance Bonus"} ,
    {beProp:"pf",label:"PF"} , {beProp: "advanceGratuity", label: "Advance Gratuity"} , {beProp:""} , 
    {beProp: "professionalAllowance", label: "Professional Allowance"}, {beProp:""} ,
    {beProp: "grossSalary", label: "Gross Salary"} , {beProp: "totalDeductions", label: "Total Deductions"} ,
    {beProp: "netSalaryPayableRs", label: "Net Salary Payable Rs", isHeading: true} , 
    {beProp:"bank", label:"Bank"} , {beProp: "accountNo", label: "Account No"} , 
    {beProp:"ifsc", label:"IFSC"} , {beProp:"esicNo", label: "ESIC No"} , {beProp:"pfUan", label: "PF UAN"}
  ];
  salaryDisplayItems;
  month = new Date().getMonth();
  months: string[] = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"];
  currentMonth = this.months[this.month];
  currentMonthNum = new Date().getMonth()+1;
  currentYear = new Date().getFullYear();
  currentMonthDays = new Date(this.currentYear, this.currentMonthNum, 0).getDate();
  objectKeys = Object.keys;
  items = { dsadaeyOne: 'value 1', aTwo: 'value 2', vThree: 'value 3' };

  constructor(private router: Router, private title: Title, 
    private fetchService: FetchSalaryService, @Inject('Window') private window: Window) { }

  ngOnInit() {
    this.title.setTitle('Salary Slip');
    var employee = this.fetchService.fetchSalary();
    this.salaryDisplayItems = [];
    for (var i = 0; i < this.salaryItemsInfo.length; i++) {
      var itemInfo = this.salaryItemsInfo[i];
      this.salaryDisplayItems.push({
        itemLabel: itemInfo.label || itemInfo.beProp,
        itemValue: employee[itemInfo.beProp],
        isHeading: itemInfo.isHeading
      });
    } 
    this.salaryDisplayItems.splice(2,0,{itemLabel:"Earnings", itemValue:"Amount Rs", isHeading: true},
    {itemLabel:"Deductions" , itemValue: "Amount Rs", isHeading: true});
    console.log(this.salaryDisplayItems);
  }

  download() {
    this.window.print();
  }

  previousPage() {
    this.router.navigate(['/home']);
  }

}