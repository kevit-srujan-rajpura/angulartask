import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  ngOnInit(): void {}

  constructor(private router: Router , private http:HttpClient) {}

  login() {
    this.http.post("http://localhost:3000",{
      email : this.email,
      password :this.password
    }).toPromise().then(res=>{
      console.log(res);
    })
    this.router.navigate(['/signup']);
  }
}
