import { Component, OnInit } from '@angular/core';
import { UserDetailService } from '../services/user-detail.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FileUploadService } from '../services/file-upload.service';

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

  constructor(private title: Title, private router: Router, private http: HttpClient,
    private fileUplaod: FileUploadService, private userService: UserDetailService, private route: Router) {}

  ngOnInit() {
    this.title.setTitle('Upload Salary Slip');
    for(var i=2017; i<= this.currentYear; i++) {
      this.years.push(i);
    };
    this.userService.getEmployeeList().subscribe(responseList => {
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
    formData.append('file', this.file, this.file.name); 
    this.fileUplaod.sendFile(formData)
    .subscribe((val) => {
      console.log(val);
    }, err => {
      console.log(err.error.customMsg)
      this.errorMsg = err.error.customMsg;
    });
    this.router.navigate(['/employeeSalary']);
  }

  previousPage() {
    this.router.navigate(['/home']);
  }

}
