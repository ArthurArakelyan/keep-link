import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { editUserEmail, selectUser } from '../../../store/user';

// Constants
import { MIN_VALIDATION_LENGTHS, VALIDATION_LENGTHS } from '../../../core/constants/validation';

@Component({
  selector: 'app-profile-email',
  templateUrl: 'profile-email.component.html',
  styleUrls: ['profile-email.component.scss'],
})
export class ProfileEmailComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  loading: boolean = false;

  private userSubscription: Subscription | undefined;

  emailForm = new FormGroup({
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
    this.userSubscription = this.store.select(selectUser).subscribe((userState) => {
      if (
        (userState.user && !this.emailForm.value.email) ||
        (userState.user && this.loading && !userState.loading.editUserEmail)
      ) {
        this.submitted = false;

        this.emailForm.setValue({
          email: userState.user.email,
          password: '',
        });
      }

      this.loading = userState.loading.editUserEmail;
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.emailForm.invalid || this.loading) {
      return;
    }

    this.store.dispatch(editUserEmail({
      payload: {
        email: this.emailForm.value.email!,
        password: this.emailForm.value.password!,
      },
    }));
  }
}
