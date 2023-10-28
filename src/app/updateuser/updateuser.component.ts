import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsService } from '../user-details.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Userdata {
  id: number;
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
  address?: { addedAddress: string }[];
}

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

  addAddress() {
    this.addresses.push(this.formbuild.control(''));
  }

  ngOnInit() {
    this.userDetailsService.userDetailsObservable$.subscribe((userDetails) => {
      if (userDetails) {
        const userId = this.route.snapshot.params['id'];
        console.log(userId);
        this.http
          .get<Userdata>('http://localhost:3000/signup' + '/' + userId)
          .subscribe((formData) => {
            if (formData.address) {
              for (let a of formData.address) {
                this.addAddress(); 
                const lastIndex = this.addresses.length - 1;
                this.addresses.at(lastIndex).patchValue(a);
              }
            }
            
            this.userDetailsForm.patchValue(formData);
          });
      }
    });
  }

  updateUser() {
    if (this.userDetailsForm) {
      const userId = this.route.snapshot.params['id'];
      this.http
        .put<Userdata>(
          'http://localhost:3000/signup' + '/' + userId,
          this.userDetailsForm.value
        )
        .subscribe((res) => {
          console.log('User updated:', res);
          this.router.navigate(['/userdata']);
        });
    } else {
      console.error(' Cannot update user.');
    }
  }
}
