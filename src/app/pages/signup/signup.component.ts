import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Constants
import { MIN_VALIDATION_LENGTHS, VALIDATION_LENGTHS } from '../../core/constants/validation';

// Validators
import { confirmPasswordValidator } from '../../core/validators/confirmPassword.validator';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss'],
})
export class SignupComponent {
  submitted: boolean = false;

  signupForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(VALIDATION_LENGTHS.short)],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.maxLength(VALIDATION_LENGTHS.long)],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(MIN_VALIDATION_LENGTHS.short), Validators.maxLength(VALIDATION_LENGTHS.base)],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, confirmPasswordValidator],
    }),
  });

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

  }
}
