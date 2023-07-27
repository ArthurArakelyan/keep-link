import { Component, EventEmitter, Input, Output } from '@angular/core';

// Models
import { ILink } from '../../../core/models/link.model';
import { IDropdownOption } from '../../../core/models/dropdown-option.model';

@Component({
  selector: 'app-link',
  templateUrl: 'link.component.html',
  styleUrls: ['link.component.scss'],
})
export class LinkComponent {
  imageError: boolean = false;

  dropdownOptions: IDropdownOption[] = [
    {
      name: 'Edit',
      icon: 'edit',
      action: () => this.onEdit(),
    },
    {
      name: 'Delete',
      icon: 'delete',
      action: () => this.onDelete(),
    },
  ];

  @Input({ required: true }) link!: ILink;
  @Input() action: 'menu' | 'redirect' | null  = 'redirect';
  @Input() imageClass: string | undefined;

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  get dropdownId() {
    return `${this.link.id}-link-dropdown`;
  }

  onImageError() {
    this.imageError = true;
  }

  onLinkClick(e: MouseEvent) {
    if ((<HTMLElement>e.target).className?.includes?.('dropdown')) {
      e.preventDefault();
    }
  }

  private onEdit() {
    this.edit.emit(this.link.id);
  }

  private onDelete() {
    this.delete.emit(this.link.id);
  }
}
