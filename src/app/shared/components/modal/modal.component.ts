import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

// Constants
import { keys } from '../../../core/constants/keys';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input({ required: true }) title: string = '';
  @Input() fullscreen: boolean = false;

  @Output() modalClose = new EventEmitter();

  private hideScrollTimeout: ReturnType<typeof setTimeout> | null = null;

  @HostListener('document:keydown', ['$event'])
  onGlobalKeyDown(e: KeyboardEvent) {
    if (e.key === keys.esc) {
      this.onClose();
    }
  }

  ngOnInit() {
    document.body.style.overflow = 'hidden';

     this.hideScrollTimeout = setTimeout(() => {
      document.body.style.overflow = 'hidden';

       this.hideScrollTimeout = setTimeout(() => {
         document.body.style.overflow = 'hidden';
       }, 100);
    }, 200);
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

  onContentWrapperKeyDown() {

  }
}
