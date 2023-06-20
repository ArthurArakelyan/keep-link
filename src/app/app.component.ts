import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

// Store
import { AppStore } from './store/app.reducer';
import { changeTheme, selectTheme } from './store/theme';
import { changeAuth, selectAuth } from './store/auth';

// Services
import { AuthService } from './core/services/auth.service';

// Utilities
import { addColorSchemeGlobalStyle } from './core/utilities/addColorSchemeGlobalStyle';
import { getPreferredTheme } from './core/utilities/getPreferredTheme';

// Models
import { ThemeType } from './core/models/theme.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '[class.light]': 'theme === "light"',
    '[class.dark]': 'theme === "dark"',
  },
})
export class AppComponent implements OnInit, OnDestroy {
  theme: ThemeType = 'light';

  themeSubscription: Subscription | null = null;
  authChangedSubscription: (() => void) | null = null;

  constructor(
    private store: Store<AppStore>,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.themeSubscription = this.store.select(selectTheme).subscribe((themeState) => {
      const theme = themeState.theme;

      this.theme = theme;

      addColorSchemeGlobalStyle(theme);

      const preferredTheme = getPreferredTheme();

      if (theme !== preferredTheme) {
        this.store.dispatch(changeTheme({ payload: preferredTheme }));
      }
    });

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

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();

    this.authChangedSubscription?.();
  }
}
