import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { selectUser } from '../../../store/user';

// Constants
import { VALIDATION_LENGTHS } from '../../../core/constants/validation';

@Component({
  selector: 'app-profile-name',
  templateUrl: 'profile-name.component.html',
  styleUrls: ['profile-name.component.scss'],
})
export class ProfileNameComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  loading: boolean = false;

  private userSubscription: Subscription | undefined;

  nameForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(VALIDATION_LENGTHS.short)],
    }),
  });

  constructor(
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.userSubscription = this.store.select(selectUser).subscribe((userState) => {
      if (userState.user) {
        this.nameForm.setValue({
          name: userState.user.name,
        });
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.nameForm.invalid) {
      return;
    }


  }
}
