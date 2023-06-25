import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

// Store
import { AppStore } from '../../../store/app.reducer';
import { logout } from '../../../store/auth';

// Models
import { IDropdownOption } from '../../models/dropdown-option.model';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent {
  avatarDropdownOptions: IDropdownOption[] = [
    {
      name: 'Logout',
      icon: 'logout',
      action: () => this.onLogout(),
    },
  ];

  constructor(
    private store: Store<AppStore>,
  ) {}

  onFocusSearch(searchElement: HTMLInputElement) {
    searchElement.focus();
  }

  private onLogout() {
    this.store.dispatch(logout());
  }
}
