import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  constructor(private router: Router) {}

  login() {
    this.router.navigate(['/buysell']);
  }

  sellProduct() {
    this.router.navigate(['sellerguide']);
  }

  productDisplay() {
    this.router.navigate(['productdisplay']);
  }

  openCart() {
    this.router.navigate(['cart']);
  }

}
