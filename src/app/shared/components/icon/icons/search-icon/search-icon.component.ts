import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-icon',
  templateUrl: 'search-icon.component.html',
})
export class SearchIconComponent {
  @Input() width: string = '16';
  @Input() height: string = '16';
  @Input() iconClass: string = '';
}
