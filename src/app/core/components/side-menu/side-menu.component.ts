import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { SideMenuService } from '../../services/side-menu.service';
import { SizeService } from '../../services/size.service';

// Constants
import { navLinks } from '../../constants/nav-links';

@Component({
  selector: 'app-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  readonly navLinks = navLinks;

  showAddButton: boolean = true;

  private sizeSubscription: Subscription | undefined;

  constructor(
    private sideMenuService: SideMenuService,
    private sizeService: SizeService,
  ) {}

  ngOnInit() {
    this.sizeSubscription = this.sizeService.size$.subscribe((size) => {
      this.showAddButton = !size._768;
    });
  }

  ngOnDestroy() {
    this.sizeSubscription?.unsubscribe();
  }

  onAdd() {
    this.close();
  }

  close() {
    this.sideMenuService.close();
  }
}
