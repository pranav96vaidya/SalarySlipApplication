import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { AppState, selectAuthenticationState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserDetailService } from '../services/user-detail.service';
// import { Logout } from 'src/app/store/actions/authentication.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  getState: Observable<any>;
  isAuthenticated: boolean;
  userName: string;
  userImg: string;
  responseData: any;
  empResponse: any;
  // constructor(private store: Store<AppState>, private userService: UserService) {
  //   this.getState = this.store.select(selectAuthenticationState);
  // }

  constructor(private readonly auth: AuthenticationService, private router: Router, private userService: UserDetailService) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.isAuthenticated = true;
    }

    this.userService.getDetail().subscribe(responseList => {
      console.log(responseList);
      this.empResponse = responseList;
      this.responseData = responseList['data'];
      this.userName = responseList['data'].fullName;
      this.userImg = responseList['data'].profileImgSmall;
    });
  }

  loadHomePage(): void {
    this.router.navigate(['./home']);
  }

  logout(): void {
    // this.store.dispatch(new Logout);
    location.href = 'http://newput.timetracker.s3-website-us-west-1.amazonaws.com/login';
  }
}
