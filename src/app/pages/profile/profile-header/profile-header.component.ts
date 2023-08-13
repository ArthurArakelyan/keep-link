import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';

// Models
import { IUser } from '../../../core/models/user.model';
import { selectUser } from '../../../store/user';

@Component({
  selector: 'app-profile-header',
  templateUrl: 'profile-header.component.html',
  styleUrls: ['profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit, OnDestroy {
  user: IUser | null = null;

  private userSubscription: Subscription | undefined;

  constructor(
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.userSubscription = this.store.select(selectUser).subscribe((userState) => {
      this.user = userState.user;
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
}
