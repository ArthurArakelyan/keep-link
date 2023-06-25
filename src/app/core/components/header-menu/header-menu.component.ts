import { Component } from '@angular/core';

// Services
import { SideMenuService } from '../../services/side-menu.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: 'header-menu.component.html',
  styleUrls: ['header-menu.component.scss'],
})
export class HeaderMenuComponent {
  constructor(
    private sideMenuService: SideMenuService,
  ) {}

  onMenuClick() {
    this.sideMenuService.open();
  }
}
