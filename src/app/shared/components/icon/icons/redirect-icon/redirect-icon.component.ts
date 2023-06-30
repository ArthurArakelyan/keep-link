import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-redirect-icon',
  templateUrl: 'redirect-icon.component.html',
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
export class RedirectIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
