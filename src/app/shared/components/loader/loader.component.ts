import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.scss'],
})
export class LoaderComponent {
  @Input() size: 'small' | 'normal' | 'large' = 'normal';

  @HostBinding('class.small') get classSmall() { return this.size === 'small'; }
  @HostBinding('class.normal') get classNormal() { return this.size === 'normal'; }
  @HostBinding('class.large') get classLarge() { return this.size === 'large'; }
}
