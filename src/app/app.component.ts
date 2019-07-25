import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserDetailService } from './services/user-detail.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
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
      window.scrollTo(0, 0)
    });
    this.userService.getDetail().subscribe(responseList => {
      console.log(responseList);
      this.fetchDone = true;
      // this.router.navigate(['/home']);
    }, error =>  { 
        console.log(error);
        this.fetchDone = true;
        // this.router.navigate(['']);
    })
  }
}
