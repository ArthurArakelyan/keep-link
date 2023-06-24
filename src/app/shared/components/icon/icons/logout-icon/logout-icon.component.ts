import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logout-icon',
  templateUrl: 'logout-icon.component.html',
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
export class LogoutIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
