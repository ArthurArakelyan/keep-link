import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { forgotPassword, selectAuth } from '../../store/auth';
import { AppStore } from '../../store/app.reducer';

// Constants
import { VALIDATION_LENGTHS } from '../../core/constants/validation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  loading: boolean = false;

  authSubscription: Subscription | undefined;

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(VALIDATION_LENGTHS.long)],
    }),
  });

  constructor(
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.authSubscription = this.store.select(selectAuth).subscribe((authState) => {
      this.loading = authState.loading.forgotPassword;
    });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.store.dispatch(forgotPassword({
      payload: {
        email: this.forgotPasswordForm.value.email!,
      },
    }));
  }
}
