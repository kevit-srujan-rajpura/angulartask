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
  address: { addedAddress: string }[];
  summary?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private userDetails!: userdata;
  private addresses: string[] = [];
  private userDetailsSubject = new BehaviorSubject<userdata>({} as userdata); //  emits current userdertials to subscriber
  userDetailsObservable$ = this.userDetailsSubject.asObservable();

  setUserDetails(userDetails: userdata) {
    this.userDetails = userDetails; // updatesd the userdetail
    // this.addresses = userDetails.addresses;
    this.userDetailsSubject.next(this.userDetails); // emits updated userdetails
  }

  getAddresses(): string[] {
    return this.addresses;
  }

  setAddresses(addresses: string[]) {
    this.addresses = addresses;
  }
}
