import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-icon',
  templateUrl: 'delete-icon.component.html',
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
export class DeleteIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
