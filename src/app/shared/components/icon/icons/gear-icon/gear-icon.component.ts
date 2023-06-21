import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gear-icon',
  templateUrl: 'gear-icon.component.html',
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
export class GearIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
