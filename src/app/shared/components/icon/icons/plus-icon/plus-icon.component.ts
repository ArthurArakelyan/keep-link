import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plus-icon',
  templateUrl: 'plus-icon.component.html',
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
export class PlusIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
