import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetailsService } from '../user-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Userdata } from '../userdata-interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alluserdata',
  templateUrl: './alluserdata.component.html',
  styleUrls: ['./alluserdata.component.css'],
})
export class AlluserdataComponent implements OnInit {
  userArray: Userdata[] = [];
  userDetailsForm!: FormGroup;
  userDetails!: Userdata;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private userDetailsService: UserDetailsService
  ) {}

  ngOnInit() {
    this.userDetailsService.userDetailsObservable$.subscribe((userDetails) => {
      if (userDetails) {
        this.http
          .get<Userdata[]>('http://localhost:3000/signup')
          .subscribe((res) => {
            if (res && res.length > 0) {
              this.userArray = res;
            } else {
              alert('There are no users in the JSON data.');
            }
          });
      } else {
        alert('Cannot get user data.');
      }
    });
  }

  addUser() {
    this.router.navigate(['/signup']);
  }

  viewUser(userId:number) {
    this.router.navigate(['/userdata',userId]);
  }
}
