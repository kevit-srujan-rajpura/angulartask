import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { userLogin } from '../datatype';
@Component({
  selector: 'app-login',
  templateUrl: './sellerlogin.component.html',
  styleUrls: ['./sellerlogin.component.css'],
})
export class SellerloginComponent implements OnInit {
  email: string = '';
  password: string = '';
  objectOfarray: any;
  issellerLogged: boolean = false;
  ngOnInit(): void {}

  constructor(private router: Router, private http: HttpClient) {}

  sellerLogin(value: userLogin): void {
    this.http.get('http://localhost:3000/seller').subscribe((res: any) => {
      this.objectOfarray = res;
      for (let enteredCredential of this.objectOfarray) {
        if (
          enteredCredential.email == value.email &&
          enteredCredential.password == value.password
        ) {
          this.router.navigate(['/sellermaintain']);
          this.issellerLogged = true;
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

  navigationArray: Array<{ label: string; link?: string }> = [
    {
      label: 'Home',
      link: '/homepage',
    },
    {
      label: 'User Selection',
      link: '/buysell',
    },
    {
      label: 'Seller Login',
    },
  ];
}
