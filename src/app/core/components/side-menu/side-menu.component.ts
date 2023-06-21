import { Component } from '@angular/core';

// Constants
import { navLinks } from '../../constants/nav-links';

@Component({
  selector: 'app-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['side-menu.component.scss'],
})
export class SideMenuComponent {
  readonly navLinks = navLinks;
}
