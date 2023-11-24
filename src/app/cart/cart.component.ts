import { Component, OnInit } from '@angular/core';
import { product } from '../datatype';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  navigationArray: Array<{ label: string; link?: string }> = [
    {
      label: 'Home',
      link: '/homepage',
    },
    {
      label: 'Cart',
    },
  ];

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
    this.router.navigate(['/productdisplay']);
  }

  buyProduct() {
    Swal.fire({
      title: 'Login Required',
      text: 'Login to buy Products!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Login Here!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/buysell']);
      } else {
        this.router.navigate(['/cart']);
      }
    });
  }

  getId = this.route.snapshot.params['id'];
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
            this.router.navigate(['/productdisplay']);
          } else {
            this.router.navigate(['/homepage']);
          }
        });
      }
    });
  }
}
