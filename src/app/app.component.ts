import { Component, OnInit } from '@angular/core';
import { UserDetailService } from './services/user-detail.service';
import { Router, NavigationEnd } from '@angular/router';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SalaryApplication';
  userName: string;
  userImg: string;
  fetchDone: boolean;
  constructor(private userService: UserDetailService, private router: Router) { }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.userService.getDetail().pipe(retry(2)).subscribe(responseList => {
      console.log(responseList);
      this.fetchDone = true;
    }, error => {
        console.log(error);
        this.fetchDone = true;
    });
  }
  
}