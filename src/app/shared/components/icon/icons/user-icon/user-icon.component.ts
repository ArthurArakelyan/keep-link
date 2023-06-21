import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-icon',
  templateUrl: 'user-icon.component.html',
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
export class UserIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
