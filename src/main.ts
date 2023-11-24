import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import 'zone.js';
import { ControlMessagesComponent } from './control-messages.component';
import { ValidationService } from './validation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlMessagesComponent],
  template: `
    <h1>Angular Form Builder and Validation Management</h1>

    <p>
      <a href="https://coryrylan.com/blog/angular-form-builder-and-validation-management">Tutorial at coryrylan.com</a>
    </p>

    <form [formGroup]="userForm" (submit)="saveUser()">
      <label for="name">Name</label>
      <input formControlName="name" id="name" />
      <control-messages [control]="userForm.get('name')"></control-messages>

      <label for="email">Email</label>
      <input formControlName="email" id="email" />
      <control-messages [control]="userForm.get('email')"></control-messages>

      <label for="profile">Profile Description</label>
      <textarea formControlName="profile" id="profile"></textarea>
      <control-messages [control]="userForm.get('profile')"></control-messages>

      <button type="submit" [disabled]="!userForm.valid">Submit</button>
    </form>
  `,
})
export class App {
  userForm: any;

  constructor(private formBuilder: FormBuilder) {

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      profile: ['', [Validators.required, Validators.minLength(10)]]
    });

    console.log(this.userForm);
  }

  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      alert(`Name: ${this.userForm.value.name} Email: ${this.userForm.value.email}`);
    }
  }
}

bootstrapApplication(App);
