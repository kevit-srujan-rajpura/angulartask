import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loggeduser',
  templateUrl: './loggeduser.component.html',
  styleUrls: ['./loggeduser.component.css'],
})
export class LoggeduserComponent implements OnInit {
  constructor(private router: Router) {}

  logOut() {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['homepage']);
      }
    });
  }

  productDisplay() {
    this.router.navigate(['loggeduserproducts']);
  }

  openCart() {
    this.router.navigate(['loggedcart']);
  }

  ngOnInit(): void {
    const loggeduserUrl = this.router.routerState.snapshot.url;
  }
}
