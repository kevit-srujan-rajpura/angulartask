import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from '../user-details.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  
  constructor(
    private router: Router,
    // private userDetailsService: UserDetailsService
  ) {}

  login() {
    
    // const userDetails = {
    //   name: 'Someone Example',
    //   dateOfBirth: new Date('June 15, 2015'),
    // };

    // this.userDetailsService.setUserDetails(userDetails);
    this.router.navigate(['/user-details']);
  }
}
