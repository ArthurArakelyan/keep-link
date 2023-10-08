import { Component, EventEmitter, Input, Output } from '@angular/core';

// Models
import { IRipple } from '../../../core/models/ripple.model';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
})
export class ButtonComponent {
  ripples: IRipple[] = [];

  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'default' | 'rounded' | 'circle' = 'default';
  @Input() color: 'primary' | 'red' = 'primary';
  @Input() label: string = '';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() buttonClass: string = '';

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  onClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      return;
    }

    this.buttonClick.emit(e);
  }

  onMouseDown(e: MouseEvent) {
    if (this.disabled || this.loading) {
      return;
    }

    const id = Math.random().toString();
    const size = (<HTMLElement>e.currentTarget).clientWidth;
    const rect = (<HTMLElement>e.currentTarget).getBoundingClientRect();

    this.ripples.push({
      id,
      size,
      top: e.clientY - rect.top - 50 + 'px',
      left: e.clientX - rect.left - 50 + 'px',
    });

    setTimeout(() => {
      this.ripples = this.ripples.filter((ripple) => ripple.id !== id);
    }, 800);
  }
}
