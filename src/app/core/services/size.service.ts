import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Utilities
import { getSize } from '../utilities/get-size';

// Models
import { ISize } from '../models/size.model';

@Injectable({ providedIn: 'root' })
export class SizeService {
  size$ = new BehaviorSubject<ISize>(getSize());

  addListener() {
    window.addEventListener('resize', this.onResize);
  }

  deleteListener() {
    window.removeEventListener('resize', this.onResize);
  }

  private onResize = () => {
    this.size$.next(getSize());
  }
}
