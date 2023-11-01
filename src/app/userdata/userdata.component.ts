import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetailsService } from '../user-details.service';
import { HttpClient } from '@angular/common/http';
import { Userdata } from '../userdata-interface';
import { FormGroup } from '@angular/forms';
import { Address } from '../userdata-interface';

@Component({
  selector: 'app-show-details',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css'],
})
export class UserdataComponent implements OnInit {
  userDetails: Userdata | undefined;
  userDetailsForm!: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private userDetailsService: UserDetailsService
  ) {}

  ngOnInit() {
    this.userDetailsService.userDetailsObservable$.subscribe((userDetails) => {
      if (userDetails) {
        const userId = this.route.snapshot.params['id'];
        console.log(userId);
        this.http
          .get<Userdata>('http://localhost:3000/signup' + '/' + userId)
          .subscribe((formData) => {
            console.log(formData);
            this.userDetails = formData;

            // for(let address in this.userDetails?.addresses){
            //   if(this.formUserData.address[address]){
            //     this.userAddress += `  ${this.formUserData.address[address].addedAddress}\n\n`;
            //   }
            // }


          });
      }
    });
  }

  editForm(userId: number) {
    this.router.navigate(['/updateuser/' + userId]);
  }

  allusersdata() {
    this.router.navigate(['/alluserdata']);
  }

  deleteUser(userDetails: Userdata['id']) {
    if (this.userDetails) {
      const userIdToDelete = this.userDetails['id'];
      this.http
        .delete(`http://localhost:3000/signup/${userIdToDelete}`)
        .subscribe(
          (response) => {
            console.log(`User with ID ${userIdToDelete} has been deleted.`);
            if (this.userDetails) {
              this.userDetails = undefined;
              this.router.navigate(['/alluserdata']);
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
