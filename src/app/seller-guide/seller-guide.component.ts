import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-guide',
  templateUrl: './seller-guide.component.html',
  styleUrls: ['./seller-guide.component.css']
})
export class SellerGuideComponent {

  constructor( private route:Router){}

  backBtn() {
    this.route.navigate(['/homepage']);
  }

  navigationArray: Array<{ label: string, link?: string }> = [
    {
      label: 'Home',
      link: '/homepage',
    },
    {
      label: 'Seller Guide'
    }];
}
