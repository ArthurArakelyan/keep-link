import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-icon',
  templateUrl: 'menu-icon.component.html',
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
export class MenuIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
