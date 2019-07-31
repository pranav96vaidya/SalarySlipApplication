import { Component, OnInit } from '@angular/core';
import { UserDetailService } from '../services/user-detail.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FileUploadService } from '../services/file-upload.service';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  file: File;
  fileToUpload: any;
  errorMsg: string;
  month = new Date().getMonth();
  months: string[] = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"];
  currentMonth = this.months[this.month];
  currentYear = new Date().getFullYear();
  years: number[]= [];
  users: string;
  employeeForm: FormGroup;
  valData: null;


  fetchDone = false;
  processing = false;
  // errorMsg: string;
  allSelected:boolean;
  checkedList:any;
  list: any;
  err = true;
  salaryItemsInfo = ["Name", "Gross Salary", "Total Deductions", "Net Salary Payable Rs", "Action"];

  constructor(private title: Title, private router: Router, private http: HttpClient,
    private fileUplaod: FileUploadService, private userService: UserDetailService, 
    private route: Router) {
      this.allSelected = true;
    }

  ngOnInit() {
    this.title.setTitle('Upload Salary Slip');
    for(var i=2017; i<= this.currentYear; i++) {
      this.years.push(i);
    };
    this.userService.getEmployeeList().pipe(retry(2)).subscribe(responseList => {
      console.log(responseList);
      this.users = responseList['data'];
    }, err =>  {
        this.errorMsg = err.error.customMsg;
    })
    this.employeeForm = new FormGroup({
      'emp': new FormControl('', Validators.required),
      'yearVal': new FormControl(this.currentYear),
      'monthVal': new FormControl(this.currentMonth)
    })
  }

  onSubmit() {
    console.log(this.employeeForm.value);
    this.route.navigate(['/employee', this.employeeForm.value.emp.id, 'salarySlip', this.employeeForm.value.emp.id ]);
  }

  uploadFile(files: FileList) {
    var selectedFile = files[0];
    var dot = selectedFile.name.lastIndexOf(".");
    if (dot == -1)
      return "";
    var extension = selectedFile.name.substr(dot, selectedFile.name.length);
    console.log(extension);
    if (extension == '.csv') {
      this.file = selectedFile;
      this.errorMsg = null;
    } else {
      this.errorMsg = "Only csv file is allowed.";
    }
  }

  uploadFileData() {
    console.log(this.file);
    let formData = new FormData(); 
    let _this = this;
    formData.append('file', this.file, this.file.name);
    this.processing = true;
    this.fetchDone = false; 
    this.fileUplaod.sendFile(formData, function(val) {
      if(val['success'] == true) {
        _this.title.setTitle('Employee salary List');
        _this.valData = val;
        _this.list = val['data'];
        _this.processing = false;
        _this.fetchDone = true;
        for(var i=0; i< _this.list.length; i++) {
          _this.list[i].isSelected = true;
        }
         console.log(val);
         _this.getCheckedItemList();
      } else {
        _this.valData = val;
        console.log(val);
      }
    });
  }

  checkUncheckAll() {
    for (var i = 0; i < this.list.length; i++) {
      this.list[i].isSelected = this.allSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    console.log(this.list);
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

  previousPage() {
    this.router.navigate(['/home']);
  }

}
