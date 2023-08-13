import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { editUserPassword, selectUser } from '../../../store/user';

// Constants
import { MIN_VALIDATION_LENGTHS, VALIDATION_LENGTHS } from '../../../core/constants/validation';

@Component({
  selector: 'app-profile-password',
  templateUrl: 'profile-password.component.html',
  styleUrls: ['profile-password.component.scss'],
})
export class ProfilePasswordComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  loading: boolean = false;

  private userSubscription: Subscription | undefined;

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(MIN_VALIDATION_LENGTHS.short), Validators.maxLength(VALIDATION_LENGTHS.base)],
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
    this.userSubscription = this.store.select(selectUser).subscribe((userState) => {
      if (this.loading && !userState.loading.editUserPassword) {
        this.submitted = false;

        this.passwordForm.reset();
      }

      this.loading = userState.loading.editUserPassword;
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.passwordForm.invalid || this.loading) {
      return;
    }

    this.store.dispatch(editUserPassword({
      payload: {
        oldPassword: this.passwordForm.value.oldPassword!,
        password: this.passwordForm.value.password!,
      },
    }));
  }
}
