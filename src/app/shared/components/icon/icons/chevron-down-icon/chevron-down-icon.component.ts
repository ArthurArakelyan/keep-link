import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chevron-down-icon',
  templateUrl: 'chevron-down-icon.html',
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
export class ChevronDownIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
