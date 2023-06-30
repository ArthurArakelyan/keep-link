import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-icon',
  templateUrl: 'edit-icon.component.html',
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
export class EditIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
