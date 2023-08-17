import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { logout } from '../../../store/auth';
import { selectUser } from '../../../store/user';

// Services
import { SizeService } from '../../services/size.service';
import { OverflowService } from '../../services/overflow.service';

// Animations
import { fadeInOut } from '../../animations/fade-in-out.animation';

// Models
import { IDropdownOption } from '../../models/dropdown-option.model';
import { keys } from '../../constants/keys';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  animations: [fadeInOut],
})
export class HeaderComponent implements OnInit, OnDestroy {
  showMenu: boolean = false;
  userName: string = '';
  userAvatar: string = '';
  searchValue: string = '';
  isSearchHidden: boolean = false;

  overflowHidden: boolean = false;
  scrollbarSize: number = 0;

  private sizeSubscription: Subscription | undefined;
  private userSubscription: Subscription | undefined;
  private overflowHiddenSubscription: Subscription | undefined;
  private scrollbarSizeSubscription: Subscription | undefined;

  readonly avatarDropdownOptions: IDropdownOption[] = [
    {
      name: 'Logout',
      icon: 'logout',
      action: () => this.onLogout(),
    },
  ];

  @ViewChild('searchContainer', { static: true }) searchContainer: ElementRef<HTMLDivElement> | undefined;

  @HostListener('document:click', ['$event'])
  private onGlobalClick(event: MouseEvent): void {
    if (!this.isSearchHidden && this.hasSearchValue && this.searchContainer && !this.searchContainer.nativeElement.contains(<HTMLElement>event.target)) {
      this.isSearchHidden = true;
    }
  }

  @HostListener('document:keydown', ['$event'])
  private onGlobalKeyDown(e: KeyboardEvent) {
    if (!this.isSearchHidden && this.hasSearchValue && e.key === keys.esc) {
      this.isSearchHidden = true;
    }
  }

  get hasSearchValue() {
    return !!this.searchValue.trim();
  }

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

  onSearchIconClick(searchElement: HTMLInputElement) {
    searchElement.focus();
  }

  onFocusSearch() {
    this.isSearchHidden = false;
  }

  onSearch(e: Event) {
    this.searchValue = (<HTMLInputElement>e.target).value;
  }

  onClearSearch() {
    this.searchValue = '';
  }

  private onLogout() {
    this.store.dispatch(logout());
  }
}
