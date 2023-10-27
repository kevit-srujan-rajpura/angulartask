import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetailsService } from '../user-details.service';

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
  selector: 'app-alluserdata',
  templateUrl: './alluserdata.component.html',
  styleUrls: ['./alluserdata.component.css'],
})
export class AlluserdataComponent implements OnInit {
  userArray: Userdata[] = []; 

  constructor(private http: HttpClient, private userDetailsService: UserDetailsService) {}

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
}
