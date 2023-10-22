import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetailsService } from '../user-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userDetailsForm: FormGroup;
  hobbies: string[] = [
    'Reading',
    'Traveling',
    'Sports',
    'Music',
    'Dancing',
    'Playing',
    'Coding',
    'Cooking',
    
  ];
  // @Input() max :any; // putted in html so user can not select future dates 
  // today = new Date(); //  so that variable is declared as a today
  max: Date = new Date(); // Initialize max in the constructor
  today: Date = new Date();

  
  degrees: string[] = [];  

  constructor(
    private formbuild: FormBuilder,
    private router: Router,
    private userDetailsService: UserDetailsService
  ) {
    this.userDetailsForm = this.formbuild.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),Validators.required]],
      education: this.formbuild.group({
        institutename: [''],
        degree: ['',Validators.required],
        percentage: ['', [Validators.pattern(/^([0-9]|[1-9][0-9]|100)$/)]],
        hobby: [''],
      }),
      gender: [''],
      
      addresses: this.formbuild.array([]),
      summary: ['', Validators.maxLength(200)],
    });
    this.today.setDate(this.today.getDate());
  }


   // Getter for the addresses FormArray
   get addresses() {
    return this.userDetailsForm.get('addresses') as FormArray;
  }

ngOnInit() {
  this.userDetailsService.userDetailsObservable$.subscribe((userDetails) => {
    if (userDetails) {  // means only goes when userDetails obj comes
      this.userDetailsForm.patchValue(userDetails);  // for the pathing data 

      // Clear existing addresses 
      // while (this.addresses.length !== 0) {
      //   this.addresses.removeAt(0);
      // }

      // Add addresses from userDetails to the form array
      for (const address of userDetails.addresses) {
        this.addAddress();
        const lastIndex = this.addresses.length - 1;
        this.addresses.at(lastIndex).setValue(address);  // set value of new adress at last 
      }
    }
  });
}


addAddress() {
  this.addresses.push(this.formbuild.control(''));
}

  resetForm() {
     


      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3f51b5',
        cancelButtonColor: '#ff4081',
        confirmButtonText: 'Yes, reset it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userDetailsForm.reset();

          Swal.fire(
            'Cleared!',
            'Your response has been cleared.',
            'success'
          )
        }
      })
  }

  submitForm() {
    if (this.userDetailsForm.valid) {
      this.userDetailsService.setUserDetails(this.userDetailsForm.value); // for edit ,  set the obj with current value using meethod 
      this.router.navigate(['/show-details']); // nav back
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Not valid !',
        text: 'Please fill all the required field',
      })
    }
  }
}
