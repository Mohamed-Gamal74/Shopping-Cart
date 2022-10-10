import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;


  constructor(private fb: FormBuilder , private router : Router) {
    this.registerForm = this.fb.group(
      {
        fName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        userName: [
          '',
          [Validators.required, Validators.pattern('[A-Za-z0-9_]+s*')],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        confirmPass: ['', Validators.required],
        formAdress: this.fb.array([this.createAddress()]),
      },
      {
        validators: this.MustMatch('password', 'confirmPass'),
      }
    );
  }

  ngOnInit(): void {
    console.log(this.registerForm.controls['formAdress']);
  }

  get registerControls() {
    return this.registerForm.controls;
  }

  handleSubmitForm() {
    // check if the form is valid and all fields of address is complete then an alert will show
    if (this.registerForm.valid && this.addresses.valid) {
      alert('successfully signed up 🎉 , \n you Can check the values of inputs in the console 🧐');
      console.table(this.registerForm.value, this.addresses.value);
      this.router.navigate([''])
    }
  }

  // custom validators to check if the password and confirm pass inputs are equel
  MustMatch(password: any, confirmPass: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPass];

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['MustMatch']
      ) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ MustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }


  // method to get controls of fromAdress
  get addresses(): FormArray {
    return this.registerForm.controls['formAdress'] as FormArray;
  }


  // method to add more address
  addAdressHandler(): void {
    let addressForm = this.fb.group({
      address: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern('[A-Za-z]')]],
      country: ['', [Validators.required, Validators.pattern('[A-Za-z]')]],
    });

    this.addresses.push(addressForm);
    console.log(this.addresses);
  }

  // this method to display the inputs at the beging
  createAddress(): FormGroup {
    return this.fb.group({
      address: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  // the delete address method
  deleteAdressHandler(index: number) {
    this.addresses.removeAt(index);
  }
}
