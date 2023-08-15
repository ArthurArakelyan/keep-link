import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

// Services
import { OverflowService } from '../../../core/services/overflow.service';

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

  constructor(
    private overflowService: OverflowService,
  ) {}

  ngOnInit() {
    this.overflowService.toggleOverflow(false);

     this.hideScrollTimeout = setTimeout(() => {
       this.overflowService.toggleOverflow(false);

       this.hideScrollTimeout = setTimeout(() => {
         this.overflowService.toggleOverflow(false);
       }, 100);
    }, 200);
  }

  ngOnDestroy() {
    if (this.hideScrollTimeout) {
      clearTimeout(this.hideScrollTimeout);
    }

    setTimeout(() => {
      this.overflowService.toggleOverflow(true);
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
