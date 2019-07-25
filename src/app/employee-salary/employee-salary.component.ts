import { Component, OnInit } from '@angular/core';
import { SalaryDetailService } from '../services/salary-details.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.scss']
})
export class EmployeeSalaryComponent implements OnInit {
  fetchDone = false;
  errorMsg: string;
  allSelected:boolean;
  checkedList:any;
  list;
  err = true;
  salaryItemsInfo = ["Name", "Gross Salary", "Total Deductions", "Net Salary Payable Rs", "Action"];
  constructor(private employeesSal: SalaryDetailService, private router: Router, private title: Title) {
    this.allSelected = true;
   }

  ngOnInit() {
    this.title.setTitle('Employee salary List');
    this.list= this.employeesSal.getSalaryDetails();
    this.fetchDone = true;
    if(this.err) {
      // this.errorMsg = err.error.customMsg;
      this.fetchDone = true;
    }
    for(var i=0; i< this.list.length; i++) {
      this.list[i].isSelected = true;
    }
    console.log(this.list);
    this.getCheckedItemList();
  }

  previousPage() {
    this.router.navigate(['/uploadSalarySlip']);
  }

  checkUncheckAll() {
    for (var i = 0; i < this.list.length; i++) {
      this.list[i].isSelected = this.allSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.allSelected = this.list.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }
 
  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.list.length; i++) {
      if(this.list[i].isSelected)
      this.checkedList.push(this.list[i]);
    }
    console.log(this.checkedList);
  }

  deleteItem() {
    if(confirm("Are you sure, you want to delete?")) {
      for (var i = 0; i < this.list.length; i++) {
        if(this.list[i].isSelected) {
          this.list.splice(i, 1);
          i--;
        }
        console.log(this.list);
      }
    } 
    console.log(this.list);
    this.getCheckedItemList();
  }

  sendMail() {
    this.checkedList = JSON.stringify(this.checkedList);
  }
}
