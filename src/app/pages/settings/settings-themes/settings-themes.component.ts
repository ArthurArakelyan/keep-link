import { Component } from '@angular/core';

// Constants
import { themes } from '../../../core/constants/themes';

@Component({
  selector: 'app-settings-themes',
  templateUrl: 'settings-themes.component.html',
  styleUrls: ['settings-themes.component.scss'],
})
export class SettingsThemesComponent {
  readonly themes = themes;
}
