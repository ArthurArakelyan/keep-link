import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.scss'],
  host: {
    '[class.small]': 'size === "small"',
    '[class.normal]': 'size === "normal"',
    '[class.large]': 'size === "large"',
  },
})
export class LoaderComponent {
  @Input() size: 'small' | 'normal' | 'large' = 'normal';
}
