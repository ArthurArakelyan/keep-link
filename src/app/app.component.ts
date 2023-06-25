import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

// Store
import { AppStore } from './store/app.reducer';
import { changeTheme, selectTheme } from './store/theme';
import { changeAuth, selectAuth } from './store/auth';

// Services
import { AuthService } from './core/services/auth.service';
import { SizeService } from './core/services/size.service';

// Utilities
import { addColorSchemeGlobalStyle } from './core/utilities/add-color-scheme-global-style';
import { getPreferredTheme } from './core/utilities/get-preferred-theme';

// Models
import { ThemeType } from './core/models/theme.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  theme: ThemeType = 'light';

  private authSubscription: Subscription | undefined;
  private themeSubscription: Subscription | undefined;
  private authChangedSubscription: (() => void) | undefined;

  @HostBinding('class.light') get classLight() { return this.theme === 'light'; }
  @HostBinding('class.dark') get classDark() { return this.theme === 'dark'; }

  constructor(
    private store: Store<AppStore>,
    private router: Router,
    private authService: AuthService,
    private sizeService: SizeService,
  ) {}

  ngOnInit() {
    this.subscribeToAuth();

    this.subscribeToTheme();

    this.subscribeToAuthChanged();

    this.sizeService.addListener();
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
    this.themeSubscription?.unsubscribe();

    this.authChangedSubscription?.();

    this.sizeService.deleteListener();
  }

  private subscribeToAuth() {
    this.authSubscription = this.store.select(selectAuth).subscribe((authState) => {
      this.isAuth = authState.isAuth;
    });
  }

  private subscribeToTheme() {
    this.themeSubscription = this.store.select(selectTheme).subscribe((themeState) => {
      const theme = themeState.theme;

      this.theme = theme;

      addColorSchemeGlobalStyle(theme);

      const preferredTheme = getPreferredTheme();

      if (theme !== preferredTheme) {
        this.store.dispatch(changeTheme({ payload: preferredTheme }));
      }
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
