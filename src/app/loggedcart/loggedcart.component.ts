import { Component, OnInit } from '@angular/core';
import { product } from '../datatype';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loggedcart',
  templateUrl: './loggedcart.component.html',
  styleUrls: ['./loggedcart.component.css'],
})
export class LoggedcartComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  isUserLogged: boolean = false;
  isCartEmpty: boolean = false;

  incrementQty(product: product) {
    if (product.product_quantity < product.quantity) {
      product.product_quantity++;
    } else {
      Swal.fire('No more Qunatity available for this product ! ');
    }
  }

  decrementQty(product: product) {
    if (product.product_quantity) {
      product.product_quantity--;
    }
  }

  removeItem(id: number) {
    this.http.delete(`http://localhost:3000/cart/${id}`).subscribe((res) => {
      this.ngOnInit();
    });
  }

  exploreProducts() {
    this.router.navigate(['/loggeduserproducts']);
  }

  buyProduct() {
    Swal.fire({
      title: 'Confirm Buy This Product ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Buy it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Product Bought Succesfully',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3f51b5',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/loggeduser']);
          }
        });
      }
    });
  }

  navigationArray: Array<{ label: string; link?: string }> = [
    {
      label: 'Home',
      link: '/loggeduser',
    },
    {
      label: 'My Cart',
    },
  ];

  cartData: product[] = [];

  ngOnInit(): void {
    this.http.get('http://localhost:3000/cart').subscribe((res: any) => {
      for (let singleresponse of res) {
        singleresponse['product_quantity'] = 1;
      }
      this.cartData = res;

      if (res < 1) {
        this.isCartEmpty = true;
        Swal.fire({
          title: 'Cart is empty !',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Explore Products',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/loggeduserproducts']);
          } else {
            this.router.navigate(['/loggeduser']);
          }
        });
      }
    });
  }
}
