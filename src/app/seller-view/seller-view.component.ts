import { Component, OnInit } from '@angular/core';
import { product } from '../datatype';
import { ProductServie } from '../productservice';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-view',
  templateUrl: './seller-view.component.html',
  styleUrls: ['./seller-view.component.css'],
})
export class SellerViewComponent implements OnInit {
  constructor(
    private product: ProductServie,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  productList!: product[];

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
      label: 'Seller Management',
      link: '/sellermaintain',
    },
    {
      label: 'Product List',
    },
  ];

  ngOnInit(): void {
    this.product.productList().subscribe((res) => {
      this.productList = res;
    });

    const seller = this.route.snapshot.params['sellername'];

    this.http.get(`http://localhost:3000/sellerview/${seller}`);
  }

  backBtn() {
    this.router.navigate(['/sellermaintain']);
  }

  edtProduct(id: number): void {
    this.router.navigate([`/editproductform/${id}`]);
  }

  rmvProduct(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3F51B5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:3000/productdetails/${id}`);

        this.ngOnInit();
      }
    });
  }
}
