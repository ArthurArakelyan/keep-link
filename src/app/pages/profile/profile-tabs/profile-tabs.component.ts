import { Component } from '@angular/core';

// Constants
import { profileTabs } from '../../../core/constants/profile-tabs';

@Component({
  selector: 'app-profile-tabs',
  templateUrl: 'profile-tabs.component.html',
  styleUrls: ['profile-tabs.component.scss'],
})
export class ProfileTabsComponent {
  readonly profileTabs = profileTabs;
}
