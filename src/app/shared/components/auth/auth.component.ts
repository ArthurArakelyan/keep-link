import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss'],
})
export class AuthComponent {
  @Input({ required: true }) title: string = '';
}
