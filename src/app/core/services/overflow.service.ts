import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OverflowService {
  overflowHidden$ = new BehaviorSubject<boolean>(false);
  scrollbarSize$ = new BehaviorSubject<number>(0);

  toggleOverflow(isOpen: boolean) {
    try {
      const screenWidth = window.innerWidth;
      const bodyWidth = document.body.offsetWidth;

      isOpen ? this.showOverflow() : this.hideOverflow();

      if (isOpen || bodyWidth >= screenWidth) {
        return;
      }

      const scrollbarWidth = screenWidth - bodyWidth;

      document.body.style.paddingRight = `${scrollbarWidth}px`;
      this.scrollbarSize$.next(scrollbarWidth);
    } catch (e) {
      console.error(e);
    }
  }

  private showOverflow() {
    document.body.style.paddingRight = '';
    document.body.style.overflow = '';
    this.overflowHidden$.next(false);
  }

  private hideOverflow() {
    document.body.style.overflow = 'hidden';
    this.overflowHidden$.next(true);
  }
}
