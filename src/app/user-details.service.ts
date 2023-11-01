import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface userdata {
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
  addressess: { addedAddress: string }[];
  summary?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  public userDetails!: userdata;
  private addressess: string[] = [];
  private userDetailsSubject = new BehaviorSubject<userdata>({} as userdata); //  emits current userdertials to subscriber
  userDetailsObservable$ = this.userDetailsSubject.asObservable();

  setUserDetails(userDetails: userdata) {
    this.userDetails = userDetails; // updatesd the userdetail
    // this.addresses = userDetails.addresses;
    this.userDetailsSubject.next(this.userDetails); // emits updated userdetails
  }

  getAddresses(): string[] {
    return this.addressess;
  }

  setAddresses(addressess: string[]) {
    this.addressess = addressess;
  }
}
