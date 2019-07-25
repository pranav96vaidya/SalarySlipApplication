import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
// import { read } from 'fs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  email: string;
  password: string;
  data: { email: string, password: string };
  payload: string;
  errorMessage: string = null;
  cookie: string;
  constructor(private route: Router, private auth: AuthenticationService) {}


  ngOnInit() {
  //   console.log(document.cookie);
  //   this.cookie = readCookie('token');
  //   function readCookie(name) {
  //     var nameEQ = name + "=";
  //     var ca = document.cookie.split(';');
  //     for(var i=0;i < ca.length;i++) {
  //         var c = ca[i];
  //         while (c.charAt(0)==' ') c = c.substring(1,c.length);
  //         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  //     }
  //     return null;
  // }
  // console.log(this.cookie);
  // if(this.cookie != null) {
  //   this.route.navigate(['/home']);
  // }
  // this.route.navigate(['/home']);
    // if(this.auth.getToken()) {
    //   this.route.navigate(['/home']);
    // }
  }

  onSubmit() {
  //   const actionPayload = {
  //     email: this.loginForm.value.email,
  //     password: this.loginForm.value.password
    };
    
  //   this.auth.login(actionPayload.email, actionPayload.password)
  //   .subscribe(res => {
  //     console.log(res);
  //     if(res && res.data) {
  //       localStorage.setItem('token',res.data);
  //       this.route.navigate(['/home']);
  //     }
  //   },error => console.log(error));
  //   console.log("welcome");
  // }
}
