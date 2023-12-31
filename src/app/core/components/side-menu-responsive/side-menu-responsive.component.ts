import { Component, HostBinding, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { SideMenuService } from '../../services/side-menu.service';
import { OverflowService } from '../../services/overflow.service';

// Animations
import { sideMenuSlideAnimation } from '../../animations/side-menu-slide.animation';

@Component({
  selector: 'app-side-menu-responsive',
  templateUrl: 'side-menu-responsive.component.html',
  styleUrls: ['side-menu-responsive.component.scss'],
  animations: [sideMenuSlideAnimation],
})
export class SideMenuResponsiveComponent implements OnInit, OnDestroy {
  open: boolean = false;

  private touchStart: number = 0;
  private touchEnd: number = 0;

  private sideMenuServiceSubscription: Subscription | undefined;

  @HostBinding('class.open') get classOpen() { return this.open; }
  @HostBinding('attr.aria-hidden') get ariaHidden() { return !this.open || null; }

  @HostListener('click', ['$event'])
  onOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      this.sideMenuService.close();
    }
  }

  constructor(
    private sideMenuService: SideMenuService,
    private overflowService: OverflowService,
  ) {}

  ngOnInit() {
    this.sideMenuServiceSubscription = this.sideMenuService.open$.subscribe((isOpen) => {
      this.open = isOpen;

      this.overflowService.toggleOverflow(!isOpen);
    });

    document.addEventListener('touchstart', this.onTouchStart);
    document.addEventListener('touchend', this.onTouchEnd);
  }

  ngOnDestroy() {
    this.sideMenuServiceSubscription?.unsubscribe();

    document.removeEventListener('touchstart', this.onTouchStart);
    document.removeEventListener('touchend', this.onTouchEnd);
  }

  private onTouchStart = (e: TouchEvent) => {
    this.touchStart = e.changedTouches[0].clientX;
  }

  private onTouchEnd = (e: TouchEvent) => {
    this.touchEnd = e.changedTouches[0].clientX;

    if (this.open) {
      if (this.touchStart - 90 > this.touchEnd) {
        this.sideMenuService.close();
      }
    }
  }
}
