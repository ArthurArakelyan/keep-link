import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from './store/app.reducer';
import { changeTheme, selectTheme } from './store/theme';

// Models
import { ThemeType } from './core/models/theme';
import { getPreferredTheme } from './core/utilities/getPreferredTheme';

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

  constructor(
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.themeSubscription = this.store.select(selectTheme).subscribe((themeState) => {
      this.theme = themeState.theme;

      if (!themeState.isChanged) {
        const preferredTheme = getPreferredTheme();

        this.store.dispatch(changeTheme({ payload: preferredTheme }));
      }
    });
  }

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
  }
}
