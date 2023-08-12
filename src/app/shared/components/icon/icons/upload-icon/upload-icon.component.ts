import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-upload-icon',
  templateUrl: 'upload-icon.component.html',
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
export class UploadIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
