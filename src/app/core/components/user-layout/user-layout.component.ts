import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { getUser } from '../../../store/user';

// Services
import { SizeService } from '../../services/size.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: 'user-layout.component.html',
  styleUrls: ['user-layout.component.scss'],
})
export class UserLayoutComponent implements OnInit, OnDestroy {
  showSideMenuResponsive: boolean = false;

  private sizeSubscription: Subscription | undefined;

  constructor(
    private store: Store<AppStore>,
    private sizeService: SizeService,
  ) {}

  ngOnInit() {
    this.store.dispatch(getUser());

    this.sizeSubscription = this.sizeService.size$.subscribe((size) => {
      this.showSideMenuResponsive = size._768;
    });
  }

  ngOnDestroy() {
    this.sizeSubscription?.unsubscribe();
  }
}
