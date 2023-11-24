import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { product } from '../datatype';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.css'],
})
export class EditProductFormComponent implements OnInit {
  productname: string = '';
  quantity!: number;
  description: string = '';
  price!: number;
  url: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}



  navigationArray: Array<{ label: string; link?: string }> = [
    {
      label: 'Home',
      link: '/homepage',
    },
    {
      label: 'User Selection',
      link: '/buysell'
    },{
    label : 'Seller Login',
    link: '/sellerlogin',
    },
    {
      label : 'Seller Management',
      link: '/sellermaintain'
    },
    {
      label: 'Product List',
      link: '/sellerview'
    },
    {
      label: 'Update Product'
    }
  ];


  productList!: product;
  ngOnInit(): void {
    const getId = this.route.snapshot.params['id'];
    this.http
      .get<product>(`http://localhost:3000/productdetails/${getId}`)
      .subscribe((res) => {
        this.productname = res.productname;
        this.quantity = res.quantity;
        this.description = res.description;
        this.price = res.price;
        this.url = res.url;
      });
  }

  updateproduct(value: product) {
    const getId = this.route.snapshot.params['id'];

    this.http
      .put(`http://localhost:3000/productdetails/${getId}`, {
        productname: value.productname,
        quantity: value.quantity,
        description: value.description,
        price: value.price,
        url: value.url,
      })
      .subscribe(
        (res) => {
          Swal.fire("Product Updated!");
        },
        (err) => {
          Swal.fire("It seems server error!");
        }
      );
  }

  backToHomepage() {
    this.router.navigate(['sellerview']);
  }
}
