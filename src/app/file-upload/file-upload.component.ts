import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDetailService } from '../services/user-detail.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { FileUploadService } from '../services/file-upload.service';
import { SendmailService } from '../services/sendmail.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  navigateUrl = environment.navigateUrl;
  file: File;
  fileToUpload: any;
  errorMsg: string;
  month = new Date().getMonth();
  months = environment.months;
  currentMonth = this.months[this.month];
  currentYear = new Date().getFullYear();
  years: number[] = [];
  users: string;
  employeeForm: FormGroup;
  fetchDone = false;
  processing = false;
  upload = false;
  allSelected: boolean;
  checkedList: any;
  list: any;
  salaryItemsInfo = ['Name', 'Gross Salary', 'Total Deductions', 'Net Salary Payable Rs', 'Action'];
  fileErrorMsg: string;
  invalidMail: [];
  monthValue: any;
  yearValue: any;
  @ViewChild('content', {static: true}) content;
  modalResponse: any;

  constructor(private readonly title: Title, private readonly router: Router, private readonly fileUploadService: FileUploadService, private readonly userDetailService: UserDetailService, private sendMailService: SendmailService, private modalService: NgbModal) {
      this.allSelected = true;
    }

  ngOnInit(): void {
    this.title.setTitle('Upload Salary Slip');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
    for (let i = 2017; i <= this.currentYear; i++) {
      this.years.push(i);
    }
    this.userDetailService.getEmployeeList().subscribe(responseList => {
      console.log(responseList);
      this.users = responseList['data'];
      this.fetchDone = true;
      this.upload = true;
    }, err =>  {
        this.errorMsg = err.error.customMsg;
        this.fetchDone = true;
        this.upload = true;
    });
    this.employeeForm = new FormGroup({
      emp: new FormControl('', Validators.required),
      yearVal: new FormControl(this.currentYear),
      monthVal: new FormControl(this.currentMonth)
    });
  }

  public onSubmit(): void {
    console.log(this.employeeForm.value.yearVal);
    this.router.navigate([`/employee/${this.employeeForm.value.emp.id}/salarySlip/view`],
    { queryParams: { month: this.employeeForm.value.monthVal.toLowerCase(), year: this.employeeForm.value.yearVal}});
  }

  public uploadFile(files: FileList): void {
    const selectedFile = files[0];
    console.log(selectedFile);
    const dot = selectedFile.name.lastIndexOf('.');
    if (dot === -1) {
      this.fileErrorMsg = "Select a valid csv file.";
    } else {
      this.fileErrorMsg = null;
      const extension = selectedFile.name.substr(dot, selectedFile.name.length);
      if (extension === '.csv') {
        this.file = selectedFile;
      } else {
        this.fileErrorMsg = 'Only csv file is allowed.';
      }
    }
  }

  public uploadFileData(): void {
    this.upload = false;
    this.fetchDone = false;
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    this.fileUploadService.sendFile(formData)
    .subscribe((val) => {
      console.log(val);
      this.title.setTitle('Employee salary List');
      if(val['data']['invalidEmails'].length) {
        this.invalidMail = val['data']['invalidEmails'];
      }
      
      this.list = val['data']['employeeData'];
      this.monthValue = this.list[0]['month'];
      this.yearValue = this.list[0]['year'];
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].isSelected = true;
      }
      this.getCheckedItemList();
      this.processing = true;
      this.upload = true;
      this.fetchDone = true;
      }, err => {
      if (err.status == 500) {
        this.errorMsg = "Some Internal server error occured! please try again later.";
      } else if (err.status == 422) {
        this.errorMsg = "The file you uploaded is not valid. Please upload other file."
      }
      this.processing = true;
      this.upload = true;
      this.fetchDone = true;
    });
  }

  public checkUncheckAll(): void {
    for (let i = 0; i < this.list.length; i++) {
      this.list[i].isSelected = this.allSelected;
    }
    this.getCheckedItemList();
  }

  public isAllSelected(): void {
    this.allSelected = this.list.every((item: any) => {
      return item.isSelected === true;
    });
    this.getCheckedItemList();
  }

  private getCheckedItemList(): void {
    this.checkedList = [];
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].isSelected) {
        this.checkedList.push(this.list[i]);
      }
    }
  }

  public deleteItem(): void {
    blur();
    if (confirm('Are you sure, you want to delete?')) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].isSelected) {
          this.list.splice(i, 1);
          i--;
        }
        console.log(this.list);
      }
    }
    console.log(this.list);
    this.getCheckedItemList();
  }

  public sendMail(): void {
    let empEmails = [];
    if(this.checkedList.length) {
      for(let i = 0; i < this.checkedList.length; i++) {
        empEmails.push(this.checkedList[i].employeeEmail);
      }
      console.log(empEmails);
      console.log(this.monthValue);
      console.log(this.yearValue);
      this.sendMailService.sendMailToEmployees(empEmails, this.monthValue, this.yearValue)
      .subscribe(res => {
        this.modalResponse = res['data']['message'];
        this.modalService.open(this.content, { windowClass: 'dark-modal' });
        console.log(res);
      })
    }
  }

  public viewSalarySlip(emp: {}): void {
    window.open(`${this.navigateUrl}/employee/${
      emp['empID']}/salarySlip/view?month=${emp['month']}&year=${emp['year']}`);
  }

  public previousPage(): void {
    this.router.navigate(['/home']);
  }

  public reloadPage(): void {
    this.fetchDone = true;
    this.processing = false;
    this.errorMsg = null;
    window.scrollTo(0, 0);
  }

}
