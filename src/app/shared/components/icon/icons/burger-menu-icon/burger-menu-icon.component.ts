import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-burger-menu-icon',
  templateUrl: 'burger-menu-icon.component.html',
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class BurgerMenuIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
