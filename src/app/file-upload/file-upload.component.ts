import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserDetailService } from '../services/user-detail.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { FileUploadService } from '../services/file-upload.service';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  file: File;
  fileToUpload: any;
  errorMsg: string;
  month = new Date().getMonth();
  months: string[] = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentMonth = this.months[this.month];
  currentYear = new Date().getFullYear();
  years: number[] = [];
  users: string;
  employeeForm: FormGroup;
  valData;
  fetchDone = false;
  processing = false;
  upload = false;
  allSelected: boolean;
  checkedList: any;
  list: any;
  salaryItemsInfo = ['Name', 'Gross Salary', 'Total Deductions', 'Net Salary Payable Rs', 'Action'];
  fileErrorMsg: string;

  constructor(private readonly title: Title, private readonly router: Router, private readonly fileUplaod: FileUploadService, private readonly userService: UserDetailService) {
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
    this.userService.getEmployeeList().pipe(retry(2)).subscribe(responseList => {
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
        console.log(this.file);
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
    this.fileUplaod.sendFile(formData)
    .subscribe((val) => {
      console.log(val);
      this.title.setTitle('Employee salary List');
      this.valData = val;
      this.list = val['data'];
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].isSelected = true;
      }
      console.log(val);
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
    this.checkedList = JSON.stringify(this.checkedList);
    console.log(this.checkedList);
  }

  public viewSalarySlip(emp: {}): void {
    window.open(`http://localhost:4200/employee/${
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
