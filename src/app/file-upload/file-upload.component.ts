import { Component, OnInit } from '@angular/core';
import { UserDetailService } from '../services/user-detail.service';
import { Title } from '@angular/platform-browser';
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
  fileToUpload;
  errorMsg: string;

  constructor(private title: Title, private router: Router, private http: HttpClient,
    private fileUplaod: FileUploadService) {}

  ngOnInit() {
    this.title.setTitle('Upload Salary Slip');
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
      this.errorMsg = "Only csv file is allowed."
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
