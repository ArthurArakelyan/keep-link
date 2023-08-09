import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-icon',
  templateUrl: 'copy-icon.component.html',
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
export class CopyIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
