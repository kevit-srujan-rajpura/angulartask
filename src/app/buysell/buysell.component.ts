import { Component } from '@angular/core';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-buysell',
  templateUrl: './buysell.component.html',
  styleUrls: ['./buysell.component.css'],
})
export class BuysellComponent {
  constructor(private route: Router) {}

  buyerLogin() {
    this.route.navigate(['login']);
  }

  sellerLogin() {
    this.route.navigate(['/sellerlogin']);
  }

  backBtn() {
    this.route.navigate(['/homepage']);
  }

  navigationArray: Array<{ label: string; link?: string }> = [
    {
      label: 'Home',
      link: '/homepage',
    },
    {
      label: 'User Selection',
    },
  ];
}
