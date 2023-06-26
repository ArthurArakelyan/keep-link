import { Component } from '@angular/core';

// Services
import { SideMenuService } from '../../services/side-menu.service';

// Constants
import { navLinks } from '../../constants/nav-links';

@Component({
  selector: 'app-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['side-menu.component.scss'],
})
export class SideMenuComponent {
  readonly navLinks = navLinks;

  constructor(
    private sideMenuService: SideMenuService,
  ) {}

  onAdd() {
    this.close();
  }

  close() {
    this.sideMenuService.close();
  }
}
