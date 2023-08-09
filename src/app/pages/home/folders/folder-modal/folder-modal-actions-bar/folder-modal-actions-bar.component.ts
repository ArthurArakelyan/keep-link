import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-folder-modal-actions-bar',
  templateUrl: 'folder-modal-actions-bar.component.html',
  styleUrls: ['folder-modal-actions-bar.component.scss'],
})
export class FolderModalActionsBarComponent {
  @Output() addLink = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  onAddLink() {
    this.addLink.emit();
  }

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
