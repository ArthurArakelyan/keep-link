import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  templateUrl: 'modal-header.component.html',
  styleUrls: ['modal-header.component.scss'],
})
export class ModalHeaderComponent {
  @Input({ required: true }) title: string = '';

  @Output() modalHeaderClose = new EventEmitter();

  onClose() {
    this.modalHeaderClose.emit();
  }
}
