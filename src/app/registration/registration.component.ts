import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  phone!: number;
  ngOnInit(): void {}

  constructor(private router: Router, private http: HttpClient) {}

  signup(value: any) {
    this.http
      .post('http://localhost:3000/buyer', {
        name: value.name,
        email: value.email,
        password: value.password,
        adddress: value.address,
        phone: value.phone,
      })
      .subscribe(
        (res) => {
          Swal.fire("User Added")
        },
        (err) => {
          Swal.fire("Server error")
        }
      );

      Swal.fire({
        title: "User Created",
        text:"Now login to buy products",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login"
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
  }

  backToHomepage() {
    this.router.navigate(['homepage']);
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
      label: 'Login',
      link: '/login',
    },
    {
      label: 'Sign Up',
    },
  ];

}
