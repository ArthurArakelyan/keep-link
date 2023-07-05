import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: 'confirm-modal.component.html',
  styleUrls: ['confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input() title: string = 'Confirm';
  @Input() submitText: string = 'Confirm';
  @Input() cancelText: string = 'Cancel';
  @Input() loading: boolean = false;

  @Output() confirmModalSubmit = new EventEmitter();
  @Output() confirmModalClose = new EventEmitter();

  onSubmit() {
    this.confirmModalSubmit.emit();
  }

  onClose() {
    if (this.loading) {
      return;
    }

    this.confirmModalClose.emit();
  }
}
