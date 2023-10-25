import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { UserDetailsService } from '../user-details.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Qualification {
  passed : string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  date: Date | undefined;
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
  max: Date = new Date(); // putted in html so user can not select future dates (max date )
  todayDate = new Date(); //  so that variable is declared as a today

  degrees: string[] = [
    
    '10th',
    '12th',
    'Bacholars',
    'Masters',
    'Doctarte'
  ];
  formGroup: any;

  stateOptions: any[] = [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}];

  value: string = 'off';
  
  password!: number | string;
  picker: any;

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
      phone: [
        '',
        [ Validators.required],
      ],
      education: this.formbuild.group({
        institutename: [''],
        degree: [''],
        percentage: ['', [Validators.pattern(/^([0-9]|[1-9][0-9]|100)$/)]],
        hobby: [''],
      }),
      gender: [''],
      password: ['', Validators.required],
      addresses: this.formbuild.array([]),
      summary: ['', Validators.maxLength(200)],
    });
    this.todayDate.setDate(this.todayDate.getDate());
  }

  get addresses() {
    return this.userDetailsForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addresses.push(this.formbuild.control(''));
  }

  ngOnInit() {
    

    this.userDetailsService.userDetailsObservable$.subscribe((userDetails) => {
      if (userDetails) {
        // means only goes when userDetails obj comes
        this.userDetailsForm.patchValue(userDetails); // for the pathing data

        // Add addresses from userDetails to the form array
        for (const address of userDetails.address) {
          this.addAddress();
          const lastIndex = this.addresses.length - 1;
          this.addresses.at(lastIndex).setValue(address); // set value of new adress at last
        }
      }
    });
  }

  resetForm() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#64748B',
      confirmButtonText: 'Yes, reset it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userDetailsForm.reset();

        Swal.fire('Cleared!', 'Your response has been cleared.', 'success');
      }
    });
  }

  submitForm() {
    if (this.userDetailsForm.invalid) {
      this.userDetailsService.setUserDetails(this.userDetailsForm.value); // for edit ,  set the obj with current value using meethod
      this.router.navigate(['/userdata']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Not valid !',
        text: 'Please fill all the required field',
      });
    }
  }
}
