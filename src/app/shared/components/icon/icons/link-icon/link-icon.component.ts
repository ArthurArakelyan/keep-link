import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link-icon',
  templateUrl: 'link-icon.component.html',
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
export class LinkIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
