import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { logout } from '../../../store/auth';
import { selectUser } from '../../../store/user';

// Services
import { SizeService } from '../../services/size.service';

// Models
import { IDropdownOption } from '../../models/dropdown-option.model';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  showMenu: boolean = false;
  userName: string = '';
  userAvatar: string = '';

  private sizeSubscription: Subscription | undefined;
  private userSubscription: Subscription | undefined;

  avatarDropdownOptions: IDropdownOption[] = [
    {
      name: 'Logout',
      icon: 'logout',
      action: () => this.onLogout(),
    },
  ];

  constructor(
    private store: Store<AppStore>,
    private sizeService: SizeService,
  ) {}

  ngOnInit() {
    this.sizeSubscription = this.sizeService.size$.subscribe((size) => {
      this.showMenu = size._768;
    });

    this.userSubscription = this.store.select(selectUser).subscribe((userState) => {
      if (userState.user) {
        this.userName = userState.user.name;
        this.userAvatar = userState.user.avatar;
      }
    });
  }

  ngOnDestroy() {
    this.sizeSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

  onFocusSearch(searchElement: HTMLInputElement) {
    searchElement.focus();
  }

  private onLogout() {
    this.store.dispatch(logout());
  }
}
