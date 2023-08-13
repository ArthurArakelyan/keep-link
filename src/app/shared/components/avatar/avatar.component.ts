import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

// Utilities
import { stringToColor } from '../../../core/utilities/string-to-color';

@Component({
  selector: 'app-avatar',
  templateUrl: 'avatar.component.html',
  styleUrls: ['avatar.component.scss'],
})
export class AvatarComponent implements OnInit, OnChanges {
  avatarSrc: string = '';

  @Input({ required: true }) name: string = '';
  @Input({ required: true }) src: string = '';
  @Input({ required: true }) alt: string = '';
  @Input({ required: true }) width: string | number = 0;
  @Input({ required: true }) height: string | number = 0;

  get avatarColor() {
    if (this.avatarSrc) {
      return '';
    }

    return stringToColor(this.name);
  }

  get nameLetters() {
    if (this.avatarSrc) {
      return '';
    }

    return `${this.name.split(' ')[0][0] || ''}`;
  }

  ngOnInit() {
    if (!this.src.trim()) {
      this.avatarSrc = '';
    } else {
      this.avatarSrc = this.src;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const src = changes['src'].currentValue;

    if (!src.trim()) {
      this.avatarSrc = '';
    } else {
      this.avatarSrc = this.src;
    }
  }

  onError() {
    this.avatarSrc = '';
  }
}
