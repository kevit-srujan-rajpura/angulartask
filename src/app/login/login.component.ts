import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { userLogin } from '../datatype';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  objectOfarray: userLogin[] = [];

  ngOnInit(): void {}

  constructor(private router: Router, private http: HttpClient) {}

  login(value: userLogin): void {
    this.http.get('http://localhost:3000/buyer').subscribe((res: any) => {
      this.objectOfarray = res;
      for (let enteredCredential of this.objectOfarray) {
        if (
          enteredCredential.email === value.email &&
          enteredCredential.password === value.password
        ) {
          this.router.navigate(['/loggeduser']);
          return;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Enter Valid Credentials!', 
          });
        }
      }
    });
  }

  backToHomepage() {
    this.router.navigate(['buysell']);
  }
  navigationArray: Array<{ label: string, link?: string }> = [
    {
      label:'Home',
      link:'/homepage'
    },
    {
      label: 'User Selection',
      link: '/buysell',
    },
    {
      label: 'login'
    }]; 


}
