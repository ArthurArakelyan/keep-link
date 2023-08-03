import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../../store/app.reducer';
import { getLinkOgImage, resetLinkOgImage, selectLink } from '../../../../store/link';

// Utilities
import { debounce } from '../../../utilities/debounce';

@Component({
  selector: 'app-add-link-image',
  templateUrl: 'add-link-image.component.html',
  styleUrls: ['add-link.image.component.scss'],
})
export class AddLinkImageComponent implements OnInit, OnDestroy, OnChanges {
  linkOgImage: string | null = null;

  @Input({ required: true }) link: string = '';

  private linkStoreSubscription: Subscription | undefined;

  constructor(
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.store.dispatch(resetLinkOgImage());

    this.linkStoreSubscription = this.store.select(selectLink).subscribe((linkState) => {
      this.linkOgImage = linkState.linkOgImage;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const link = changes['link']?.currentValue;

    if (link) {
      this.onLinkChange(link);
    }
  }

  ngOnDestroy() {
    this.linkStoreSubscription?.unsubscribe();

    this.store.dispatch(resetLinkOgImage());
  }

  onLinkChange = debounce((link: string) => {
    this.store.dispatch(getLinkOgImage({ payload: link }));
  }, 700);
}
