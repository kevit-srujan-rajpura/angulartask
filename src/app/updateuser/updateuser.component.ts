import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsService } from '../user-details.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Userdata } from '../userdata-interface';

@Component({
  selector: 'app-signup',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css'],
})
export class UpdateuserComponent {
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
  dataDeleted: boolean = false;

  degrees: string[] = ['10th', '12th', 'Bacholars', 'Masters', 'Doctarte'];
  formGroup: any;
  password!: number | string;
  picker!: Date;

  constructor(
    private formbuild: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
      addresses: this.formbuild.array([]),
    });
    this.todayDate.setDate(this.todayDate.getDate());
  }

  get addresses() {
    return this.userDetailsForm.get('addresses') as FormArray;
  }

  // addAddress() {
  //   this.addresses.push(this.formbuild.control(''));
  // }


  addAddress() : void {
    const newAddress = this.formbuild.group({
      addedAddress: ''
    })
    this.addresses.push(newAddress);
  }


  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
console.log("hiii")
    if (userId) {
      // console.log(userId);
      console.log("hiii")
      this.http
        .get<Userdata>('http://localhost:3000/signup' + '/' + userId)
        .subscribe((formData) => {
         

            console.log("hello");

            // for (const add of formData.address) {
            //   console.log(add);
            //   // this.addresses;
            //   // const lastIndex = this.addresses.length - 1;
            //   // this.addresses.at(lastIndex).setValue(address); 
            // }
          
        
          this.userDetailsForm.patchValue(formData);
        });
    }
  }

  updateUser() {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.http
        .put<Userdata>(
          'http://localhost:3000/signup' + '/' + userId,
          this.userDetailsForm.value
        )
        .subscribe((res) => {
          console.log('User updated:', res);
          this.router.navigate(['/alluserdata']);
        });
    } else {
      console.error(' Cannot update user.');
    }
  }
}
