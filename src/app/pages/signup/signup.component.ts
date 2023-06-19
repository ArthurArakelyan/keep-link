import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Constants
import { MIN_VALIDATION_LENGTHS, VALIDATION_LENGTHS } from '../../core/constants/validation';

// Validators
import { confirmPasswordValidator } from '../../core/validators/confirmPassword.validator';

// Store
import { AppStore } from '../../store/app.reducer';
import { selectAuth, signup } from '../../store/auth';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  loading: boolean = false;

  authSubscription: Subscription | null = null;

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

  constructor(
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.authSubscription = this.store.select(selectAuth).subscribe((authState) => {
      this.loading = authState.loading.signup;
    });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.store.dispatch(signup({
      payload: {
        name: this.signupForm.value.name!,
        email: this.signupForm.value.email!,
        password: this.signupForm.value.password!,
      },
    }));
  }
}
