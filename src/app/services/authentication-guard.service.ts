import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuardService {

    constructor(
        public router: Router,
        private authenticationService: AuthenticationService
    ){}

    canActivate(): boolean {
        const isLoggedIn = this.authenticationService.isLoggedIn();
        
        if (!isLoggedIn) {
            location.href="http://newput.timetracker.s3-website-us-west-1.amazonaws.com/login";
            return false;
        }
        return true;
    }
}