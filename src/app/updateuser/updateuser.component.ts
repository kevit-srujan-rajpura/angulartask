import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from '../user-details.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Userdata {
  id:number;
  name: string;
  dateOfBirth: Date;
  email: string;
  phone: number;
  education?: {
    institutename: string;
    degree: string;
    percentage: number;

    hobby?: {
      Reading: boolean;
      Traveling: boolean;
      Sports: boolean;
      Music: boolean;
      Dancing: boolean;
      Playing: boolean;
      Coding: boolean;
      Cooking: boolean;
    };
  };
  gender?: string;
  address?: { addedAddress: string }[];
}

@Component({
  selector: 'app-show-details',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css'],
})
export class UserdataComponent implements OnInit {
  userDetails: Userdata | undefined;
  // headers = new Headers({
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  // });

  // httpOptions = {
  //   headers: this.headers,
  // };

  constructor(
    private router: Router,
    private http: HttpClient,
    private userDetailsService: UserDetailsService
  ) {}

  ngOnInit() {
    this.userDetailsService.userDetailsObservable$.subscribe((userDetails) => {
      if (userDetails) {
        console.log(userDetails.id)
        this.http
          .get<Userdata[]>(' http://localhost:3000/signup')
          .subscribe((res) => {
            if (res && res.length > 0) {
              this.userDetails = res[res.length - 1];
            } else {
              alert('Ther is no user exists');
            }
          });
      } else {
        this.router.navigate(['/signup']);
      }
    });
  }

  editForm(userDetails: Userdata["id"]) {
    this.router.navigate(['/updateuser', this.userDetails]);



  }

  allusersdata() {
    this.router.navigate(['/alluserdata']);
  }

  deleteUser(userDetails: Userdata["id"]) {
    if (this.userDetails) {
      const userIdToDelete = this.userDetails['id'];
      this.http
        .delete(`http://localhost:3000/signup/${userIdToDelete}`)
        .subscribe(
          (response) => {
            console.log(`User with ID ${userIdToDelete} has been deleted.`);
            if (this.userDetails) {
              this.userDetails = undefined;
            }
          },
          (error) => {
            console.error(
              `Error deleting user with ID ${userIdToDelete}:`,
              error
            );
          }
        );
    }
  }
}
