import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { selectLink } from '../../../store/link';

// Models
import { ILink } from '../../../core/models/link.model';

@Component({
  selector: 'app-links',
  templateUrl: 'links.component.html',
  styleUrls: ['links.component.scss'],
})
export class LinksComponent implements OnInit, OnDestroy {
  links: ILink[] = [];

  linkStoreSubscription: Subscription | undefined;

  constructor(
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.linkStoreSubscription = this.store.select(selectLink).subscribe((linkState) => {
      this.links = linkState.list;
    });
  }

  ngOnDestroy() {
    this.linkStoreSubscription?.unsubscribe();
  }
}
