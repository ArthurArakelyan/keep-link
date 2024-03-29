import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../../store/app.reducer';
import { changeColor, selectTheme } from '../../../../store/theme';

// Models
import { ColorType, IColor } from '../../../../core/models/color.model';

@Component({
  selector: 'app-settings-color',
  templateUrl: 'settings-color.component.html',
  styleUrls: ['settings-color.component.scss'],
})
export class SettingsColorComponent implements OnInit, OnDestroy {
  currentColor: ColorType = 'blue';

  @Input({ required: true }) color!: IColor;

  private themeSubscription: Subscription | undefined;

  get styles() {
    return {
      backgroundColor: this.color.color,
      filter: this.color.name === this.currentColor ? `drop-shadow(0 0 0.4rem ${this.color.color})` : '',
    };
  }

  constructor(
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.themeSubscription = this.store.select(selectTheme).subscribe((themeState) => {
      this.currentColor = themeState.color;
    });
  }

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
  }

  onColorClick() {
    this.store.dispatch(changeColor({
      payload: this.color.name,
    }));
  }
}
