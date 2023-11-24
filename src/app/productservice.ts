import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from './datatype';

@Injectable({
  providedIn: 'root',
})
export class ProductServie {
  constructor(private http: HttpClient) {}

  productList() {
    return this.http.get<product[]>('http://localhost:3000/productdetails');
  }

  removeProduct() {
    return this.http.delete('http://localhost:3000/productdetails');
  }

  editProduct() {
    return this.http.put(
      'http://localhost:3000/productdetails',
      this.productList
    );
  }
}
