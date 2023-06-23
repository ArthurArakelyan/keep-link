import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// Store
import { AppStore } from '../../../store/app.reducer';
import { getUser } from '../../../store/user';

@Component({
  selector: 'app-user-layout',
  templateUrl: 'user-layout.component.html',
  styleUrls: ['user-layout.component.scss'],
})
export class UserLayoutComponent implements OnInit {
  constructor(
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.store.dispatch(getUser());
  }
}
