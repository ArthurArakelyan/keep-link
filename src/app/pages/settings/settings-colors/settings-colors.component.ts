import { Component } from '@angular/core';

// Constants
import { colors } from '../../../core/constants/colors';

@Component({
  selector: 'app-settings-colors',
  templateUrl: 'settings-colors.component.html',
  styleUrls: ['settings-colors.component.scss'],
})
export class SettingsColorsComponent {
  readonly colors = colors;
}
