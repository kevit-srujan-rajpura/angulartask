import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { product } from '../datatype';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css'],
})
export class ProductformComponent implements OnInit {
  sellername:string = '';
  productname: string = '';
  quantity!: number;
  description: string = '';
  price!: number;
  url: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  addproduct(value: product) {
    this.http
      .post('http://localhost:3000/productdetails', {
        sellername: value.sellername,
        productname: value.productname,
        quantity: value.quantity,
        description: value.description,
        price: value.price,
        url: value.url,
      })
      .subscribe(
        (res) => {
          Swal.fire("Product added")
        },
        (err) => {
        Swal.fire("Server Error")
        }
      );
  }

  backToHomepage() {
    this.router.navigate(['sellermaintain']);
  }


  navigationArray: Array<{ label: string; link?: string }> = [
    {
      label: 'Home',
      link: '/homepage',
    },
    {
      label: 'User Selection',
      link: '/buysell'
    },
    {
      label:'Seller Login',
      link : '/sellerlogin',
    },
    {
      label:'Seller Management',
      link: '/sellermaintain'

    },
    {
      label: 'Product Form'
    }
  ];
}
