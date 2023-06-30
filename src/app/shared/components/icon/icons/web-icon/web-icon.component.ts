import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-web-icon',
  templateUrl: 'web-icon.component.html',
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
export class WebIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
