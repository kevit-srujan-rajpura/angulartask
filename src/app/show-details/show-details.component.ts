
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from '../user-details.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css'],
})
export class ShowDetailsComponent implements OnInit {
  userDetails: any = {};
  displayedColumns: string[] = [
    'name',
    'dateOfBirth',
    'email',
    'phone',
    'institutename',
    'degree',
    'percentage',
    'hobby',
    'gender',
    'addresses',
    'summary'
  ];

  constructor(
    private router: Router,
    private userDetailsService: UserDetailsService
  ) {}

  ngOnInit() {
    this.userDetailsService.userDetailsObservable$.subscribe((userDetails) => {
      if (userDetails) {  // true when the obj comes
        this.userDetails = userDetails;  // value setted here to show
      } else {
        this.router.navigate(['/user-details']);
      }
    });
  }

  editForm() {
    // this.userDetailsService.setUserDetails(this.userDetails);
    this.router.navigate(['/user-details']);
  }
}