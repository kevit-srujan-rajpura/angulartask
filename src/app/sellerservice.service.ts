import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerserviceService {

  constructor(private http : HttpClient) { }

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  loginSeller(value:any){
    return this.http.post("http://localhost:3000/sellerlogin" , value);

  }

}
