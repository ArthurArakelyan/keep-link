import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Constants
import { MIN_VALIDATION_LENGTHS, VALIDATION_LENGTHS } from '../shared/constants/validation';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  submitted = false;

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.maxLength(VALIDATION_LENGTHS.long)],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(MIN_VALIDATION_LENGTHS.short), Validators.maxLength(VALIDATION_LENGTHS.base)],
    }),
  });

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }


  }
}
