import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { SizeService } from '../../../core/services/size.service';

@Component({
  selector: 'app-fab',
  templateUrl: 'fab.component.html',
  styleUrls: ['fab.component.scss'],
})
export class FabComponent implements OnInit, OnDestroy {
  show: boolean = false;

  private sizeSubscription: Subscription | undefined;

  @Input() icon: string = 'plus';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  @Output() fabClick = new EventEmitter<MouseEvent>();

  constructor(
    private sizeService: SizeService,
  ) {}

  ngOnInit() {
    this.sizeSubscription = this.sizeService.size$.subscribe((size) => {
      this.show = size._768;
    });
  }

  ngOnDestroy() {
    this.sizeSubscription?.unsubscribe();
  }

  onClick(e: MouseEvent) {
    if (this.disabled) {
      return;
    }

    this.fabClick.emit(e);
  }
}
