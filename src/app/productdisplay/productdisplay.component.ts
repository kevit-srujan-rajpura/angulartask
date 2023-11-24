import { Component, OnInit } from '@angular/core';
import { product } from '../datatype';
import { ProductServie } from '../productservice';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productdisplay',
  templateUrl: './productdisplay.component.html',
  styleUrls: ['./productdisplay.component.css'],
})
export class ProductdisplayComponent implements OnInit {
  constructor(
    private product: ProductServie,
    private route: Router,
    private http: HttpClient
  ) {}
  productList!: product[];

  ngOnInit(): void {
    this.product.productList().subscribe((res) => {
      this.productList = res;
    });
  }

  addToCart(value: product) {
    this.http.post('http://localhost:3000/cart', value).subscribe((res) => {
    });

    this.route.navigate(['/cart']);
  }

  backBtn() {
    this.route.navigate(['/homepage']);
  }

  navigationArray: Array<{ label: string, link?: string }> = [
    {
      label: 'Home',
      link: '/homepage',
    },
    {
      label: 'Products'
    }];

}
