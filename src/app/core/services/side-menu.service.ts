import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SideMenuService {
  open$ = new BehaviorSubject<boolean>(false);

  open() {
    this.open$.next(true);
  }

  close() {
    this.open$.next(false);
  }
}
