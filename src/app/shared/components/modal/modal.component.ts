import { Component, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';

// Constants
import { keys } from '../../../core/constants/keys';

// Animations
import { fadeTranslateInOut } from '../../../core/animations/fade-translate-in-out.animation';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  animations: [fadeTranslateInOut],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input({ required: true }) title: string = '';

  @Output() modalClose = new EventEmitter();

  @HostListener('document:keydown', ['$event'])
  onGlobalKeyDown(e: KeyboardEvent) {
    if (e.key === keys.esc) {
      this.onClose();
    }
  }

  @HostBinding('@fadeTranslateInOut')
  get fadeInOut() {
    return true;
  }

  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    setTimeout(() => {
      document.body.style.overflow = '';
    }, 200);
  }

  onClose() {
    this.modalClose.emit();
  }

  onContentWrapperClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      this.onClose();
    }
  }

  onContentWrapperKeyDown(e: KeyboardEvent) {
    if (document.activeElement !== e.currentTarget) {
      return;
    }
  }
}
