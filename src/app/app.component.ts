import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

// Store
import { AppStore } from './store/app.reducer';
import {
  ThemeState,
  selectTheme,
  initialState as themeInitialState,
  changePreferredTheme,
  changePreferredContrast,
} from './store/theme';
import { AuthState, changeAuth, selectAuth, initialState as authInitialState } from './store/auth';

// Services
import { AuthService } from './core/services/auth.service';
import { SizeService } from './core/services/size.service';
import { ThemeService } from './core/services/theme.service';

// Utilities
import { addColorSchemeGlobalStyle } from './core/utilities/add-color-scheme-global-style';
import { getStoreSync } from './core/utilities/get-store-sync';
import { changeFavicon } from './core/utilities/change-favicon';
import { changeThemeColor } from './core/utilities/change-theme-color';

// Models
import { ColorSchemeType, ThemeType } from './core/models/theme.model';
import { ColorType } from './core/models/color.model';

const authStoreStorage = getStoreSync<AuthState>('auth', authInitialState);
const themeStoreStorage = getStoreSync<ThemeState>('theme', themeInitialState);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuth: boolean = authStoreStorage.isAuth;
  theme: ThemeType = themeStoreStorage.theme;
  preferredTheme: ColorSchemeType = themeStoreStorage.preferredTheme;
  preferredContrast: boolean = themeStoreStorage.preferredContrast;
  color: ColorType = themeStoreStorage.color;

  private authSubscription: Subscription | undefined;
  private themeSubscription: Subscription | undefined;
  private colorSchemeSubscription: Subscription | undefined;
  private contrastSubscription: Subscription | undefined;
  private authChangedSubscription: (() => void) | undefined;

  @HostBinding('class.light') get classLight() { return this.theme === 'default' ? this.preferredTheme === 'light' : this.theme === 'light'; }
  @HostBinding('class.dark') get classDark() { return this.theme === 'default' ? this.preferredTheme === 'dark' : this.theme === 'dark'; }
  @HostBinding('class.dark-high-contrast') get classDarkHighContrast() { return this.theme === 'default' ? (this.preferredTheme === 'dark' && this.preferredContrast) : this.theme === 'darkHighContrast'; }
  @HostBinding('class') get hostClasses() { return this.color || 'blue'; }

  constructor(
    private store: Store<AppStore>,
    private router: Router,
    private authService: AuthService,
    private sizeService: SizeService,
    private themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.subscribeToAuth();

    this.subscribeToTheme();

    this.subscribeToPreferredTheme();

    this.subscribeToAuthChanged();

    this.sizeService.addListener();

    this.themeService.addListener();

    changeFavicon(this.color);
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
    this.themeSubscription?.unsubscribe();
    this.colorSchemeSubscription?.unsubscribe();
    this.contrastSubscription?.unsubscribe();

    this.authChangedSubscription?.();

    this.sizeService.deleteListener();

    this.themeService.deleteListener();
  }

  private subscribeToAuth() {
    this.authSubscription = this.store.select(selectAuth).subscribe((authState) => {
      this.isAuth = authState.isAuth;
    });
  }

  private subscribeToTheme() {
    this.themeSubscription = this.store.select(selectTheme).subscribe((themeState) => {
      const prevColor = this.color;

      this.theme = themeState.theme;
      this.preferredTheme = themeState.preferredTheme;
      this.preferredContrast = themeState.preferredContrast;
      this.color = themeState.color;

      if (prevColor !== themeState.color) {
        changeFavicon(themeState.color);
      }

      addColorSchemeGlobalStyle(themeState.theme, themeState.preferredTheme);
      changeThemeColor(themeState.theme, themeState.preferredTheme);
    });
  }

  private subscribeToPreferredTheme() {
    this.colorSchemeSubscription = this.themeService.colorScheme$.subscribe((colorScheme) => {
      this.store.dispatch(changePreferredTheme({ payload: colorScheme }));
    });

    this.contrastSubscription = this.themeService.contrast$.subscribe((contrast) => {
      this.store.dispatch(changePreferredContrast({ payload: contrast }));
    });
  }

  private subscribeToAuthChanged() {
    this.authChangedSubscription = this.authService.onAuthChanged((user) => {
      if (!user) {
        this.store.select(selectAuth)
          .pipe(
            take(1),
          )
          .subscribe((authState) => {
            if (authState.isAuth) {
              this.store.dispatch(changeAuth({ payload: false }));

              this.router.navigate(['/login']);
            }
          });
      }
    });
  }
}
