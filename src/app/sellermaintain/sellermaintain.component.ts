import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sellermaintain',
  templateUrl: './sellermaintain.component.html',
  styleUrls: ['./sellermaintain.component.css'],
})
export class SellermaintainComponent {
  constructor(private route: Router) {}

  issellerLogged: boolean = true;

  backBtn() {
    this.route.navigate(['/homepage']);
  }

  sellProduct() {
    this.route.navigate(['/productform']);
  }

  manageProduct() {
    this.route.navigate(['sellerview']);
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

    }
  ];
}
