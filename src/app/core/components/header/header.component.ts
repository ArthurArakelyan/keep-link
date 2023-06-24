import { Component } from '@angular/core';

// Models
import { IDropdownOption } from '../../models/dropdown-option.model';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent {
  avatarDropdownOptions: IDropdownOption[] = [
    {
      name: 'Logout',
      icon: 'logout',
      action: () => {},
    },
  ];

  onFocusSearch(searchElement: HTMLInputElement) {
    searchElement.focus();
  }
}
