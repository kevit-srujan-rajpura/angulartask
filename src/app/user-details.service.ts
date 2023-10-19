import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private userDetails: any = {};
  private addresses: string[] = [];
  private userDetailsSubject = new BehaviorSubject<any>(null); //  emit current userdertials to subscriber 
  userDetailsObservable$ = this.userDetailsSubject.asObservable();

  setUserDetails(userDetails: any) {
    this.userDetails = userDetails;  // updatesd the userdetail
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
