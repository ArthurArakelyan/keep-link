import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Constants
import { MIN_VALIDATION_LENGTHS, VALIDATION_LENGTHS } from '../../core/constants/validation';

// Store
import { AppStore } from '../../store/app.reducer';
import { login, selectAuth } from '../../store/auth';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  loading: boolean = false;

  authSubscription: Subscription | null = null;

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(VALIDATION_LENGTHS.long)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(MIN_VALIDATION_LENGTHS.short), Validators.maxLength(VALIDATION_LENGTHS.base)],
    }),
  });

  constructor(
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.authSubscription = this.store.select(selectAuth).subscribe((authState) => {
      this.loading = authState.loading.login;
    });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(login({
      payload: {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      },
    }));
  }
}
