import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../../store/app.reducer';
import { changeTheme, selectTheme } from '../../../../store/theme';

// Models
import { ITheme, ThemeType } from '../../../../core/models/theme.model';

@Component({
  selector: 'app-settings-theme',
  templateUrl: 'settings-theme.component.html',
  styleUrls: ['settings-theme.component.scss']
})
export class SettingsThemeComponent implements OnInit, OnDestroy {
  currentTheme: ThemeType = 'default';

  @Input({ required: true }) theme!: ITheme;

  private themeSubscription: Subscription | undefined;

  constructor(
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.themeSubscription = this.store.select(selectTheme).subscribe((themeState) => {
      this.currentTheme = themeState.theme;
    });
  }

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
  }

  onThemeClick() {
    this.store.dispatch(changeTheme({
      payload: this.theme.theme,
    }));
  }
}
