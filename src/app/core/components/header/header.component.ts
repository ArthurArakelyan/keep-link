import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { logout } from '../../../store/auth';
import { selectUser } from '../../../store/user';

// Services
import { SizeService } from '../../services/size.service';
import { OverflowService } from '../../services/overflow.service';

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
  overflowHidden: boolean = false;
  scrollbarSize: number = 0;

  private sizeSubscription: Subscription | undefined;
  private userSubscription: Subscription | undefined;
  private overflowHiddenSubscription: Subscription | undefined;
  private scrollbarSizeSubscription: Subscription | undefined;

  avatarDropdownOptions: IDropdownOption[] = [
    {
      name: 'Logout',
      icon: 'logout',
      action: () => this.onLogout(),
    },
  ];

  get avatarPaddingRight() {
    if (!this.overflowHidden) {
      return '0';
    }

    return `${this.scrollbarSize}px`;
  }

  constructor(
    private store: Store<AppStore>,
    private sizeService: SizeService,
    private overflowService: OverflowService,
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

    this.overflowHiddenSubscription = this.overflowService.overflowHidden$.subscribe((overflowHidden) => {
      this.overflowHidden = overflowHidden;
    });

    this.scrollbarSizeSubscription = this.overflowService.scrollbarSize$.subscribe((scrollbarSize) => {
      this.scrollbarSize = scrollbarSize;
    });
  }

  ngOnDestroy() {
    this.sizeSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
    this.overflowHiddenSubscription?.unsubscribe();
    this.scrollbarSizeSubscription?.unsubscribe();
  }

  onFocusSearch(searchElement: HTMLInputElement) {
    searchElement.focus();
  }

  private onLogout() {
    this.store.dispatch(logout());
  }
}
