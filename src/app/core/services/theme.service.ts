import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Models
import { ColorSchemeType } from '../models/theme.model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  colorScheme$ = new BehaviorSubject<ColorSchemeType>('light');
  contrast$ = new BehaviorSubject<boolean>(false);

  private colorSchemeMedia: MediaQueryList | undefined;
  private contrastMedia: MediaQueryList | undefined;

  addListener() {
    this.colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    this.contrastMedia = window.matchMedia('(prefers-contrast: more)');

    this.onColorSchemeChange(this.colorSchemeMedia);
    this.onContrastChange(this.contrastMedia);

    this.colorSchemeMedia.addEventListener('change', this.onColorSchemeChange);
    this.contrastMedia.addEventListener('change', this.onContrastChange);
  }

  deleteListener() {
    this.colorSchemeMedia?.removeEventListener('change', this.onColorSchemeChange);
    this.contrastMedia?.removeEventListener('change', this.onContrastChange);
  }

  private onColorSchemeChange = ({ matches }: MediaQueryListEvent | MediaQueryList) => {
    this.colorScheme$.next(matches ? 'dark' : 'light');
  }

  private onContrastChange = ({ matches }: MediaQueryListEvent | MediaQueryList) => {
    this.contrast$.next(matches);
  }
}
