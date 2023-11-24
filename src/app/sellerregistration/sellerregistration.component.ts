import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './sellerregistration.component.html',
  styleUrls: ['./sellerregistration.component.css'],
})
export class SellerregistrationComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  phone!: number;
  gst: string = '';
  ngOnInit(): void {}

  constructor(private router: Router, private http: HttpClient) {}

  createSeller(value: any) {
    this.http
      .post('http://localhost:3000/seller', {
        name: value.name,
        email: value.email,
        password: value.password,
        phone: value.phone,
        gst: value.gst,
      })
      .subscribe(
        (res) => {
         Swal.fire("User Created")
        },
        (err) => {
        Swal.fire("Server error")
        }
      );

    Swal.fire({
      title: 'User Created',
      text: 'Now login to sell your products',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Login',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/sellerlogin']);
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
      label: 'Seller Login',
      link: '/sellerlogin',
    },
    {
      label: 'Sign Up',
    },
  ];
}
