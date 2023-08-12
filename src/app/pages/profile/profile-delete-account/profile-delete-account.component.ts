import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { deleteUser, selectUser } from '../../../store/user';

// Constants
import { MIN_VALIDATION_LENGTHS, VALIDATION_LENGTHS } from '../../../core/constants/validation';

@Component({
  selector: 'app-profile-delete-account',
  templateUrl: 'profile-delete-account.component.html',
  styleUrls: ['profile-delete-account.component.scss'],
})
export class ProfileDeleteAccountComponent {
  submitted: boolean = false;
  loading: boolean = false;

  private userSubscription: Subscription | undefined;

  deleteAccountForm = new FormGroup({
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
      this.loading = userState.loading.deleteUser;
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.deleteAccountForm.invalid || this.loading) {
      return;
    }

    this.store.dispatch(deleteUser({
      payload: {
        password: this.deleteAccountForm.value.password!,
      },
    }));
  }
}
