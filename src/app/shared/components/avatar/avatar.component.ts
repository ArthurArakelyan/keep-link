import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: 'avatar.component.html',
  styleUrls: ['avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  private readonly defaultAvatarSrc: string = '/assets/avatar.png';

  avatarSrc: string = '';

  @Input({ required: true }) src: string = '';
  @Input({ required: true }) alt: string = '';
  @Input({ required: true }) width: string | number = 0;
  @Input({ required: true }) height: string | number = 0;

  ngOnInit() {
    if (!this.src.trim()) {
      this.avatarSrc = this.defaultAvatarSrc;
    } else {
      this.avatarSrc = this.src;
    }
  }

  onError() {
    this.avatarSrc = this.defaultAvatarSrc;
  }
}
