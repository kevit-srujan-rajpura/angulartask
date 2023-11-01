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
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

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
  addressess?: { addedAddress: string }[];
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  userDetails: Userdata | undefined;
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
  max: Date = new Date();
  todayDate = new Date();
  updateMode: boolean = false;
  dataDeleted: boolean = false;

  degrees: string[] = ['10th', '12th', 'Bacholars', 'Masters', 'Doctarte'];
  formGroup: any;

  password!: number | string;
  picker!: Date;

  constructor(
    private formbuild: FormBuilder,
    private router: Router,
    private http: HttpClient,
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
      phone: ['', [Validators.required]],
      education: this.formbuild.group({
        institutename: [''],
        degree: [''],
        percentage: ['', [Validators.pattern(/^([0-9]|[1-9][0-9]|100)$/)]],
        hobby: [''],
      }),
      gender: [''],
      addressess: this.formbuild.array([]),
    });
    this.todayDate.setDate(this.todayDate.getDate());
  }

  get addressess() {
    return this.userDetailsForm.get('addressess') as FormArray;
  }

  addAddress() {
    this.addressess.push(this.formbuild.control(''));
  }

  createAdress(addressess: { addedAddress: String; }) : FormGroup{
    return this.formbuild.group({
      addedAddress: addressess.addedAddress
    });
  }

  ngOnInit() {
  
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
      }
    });
  }

  submitForm() {
    if (this.userDetailsForm.invalid) {
      this.userDetailsService.setUserDetails(this.userDetailsForm.value);

      this.http
        .post('http://localhost:3000/signup', this.userDetailsForm.value)
        .subscribe(
          (res) => {
            console.log('Success:', res);
            this.router.navigate(['/alluserdata']);
          },
          (error) => {
            console.error('Error:', error);
          }
        );

      this.router.navigate(['/alluserdata']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Not valid !',
        text: 'Please fill all the required field',
      });
    }
  }

}
