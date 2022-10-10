import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router : Router ) {}

  ngOnInit(): void {}

  // after submiting console log the inputs value and route to home page
  handleSubmitForm(form: any) {
    alert('Logged In 🎉 , \n you Can check the values of inputs in the console 🧐');
    console.table(form.value);
    this.router.navigate(['/'])
  }
}
