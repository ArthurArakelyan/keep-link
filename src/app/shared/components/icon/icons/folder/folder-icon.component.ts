import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-folder-icon',
  templateUrl: 'folder-icon.component.html',
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
export class FolderIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
