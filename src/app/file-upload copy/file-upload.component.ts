import { Component, OnInit } from '@angular/core';
import { UserDetailService } from '../services/user-detail.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  fileToUpload: File = null;
  constructor(private title: Title, private route: Router) { }

  ngOnInit() {
    this.title.setTitle('Upload Salary Slip');
    // this.userService.getDetail().subscribe();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }

  uploadFile() {
    this.route.navigate(['/employeeSalary']);
  }

}
