import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { deleteLink, selectLink } from '../../../store/link';

// Animations
import { modalTranslateAnimation } from '../../../core/animations/modal-translate.animation';

// Models
import { ILink } from '../../../core/models/link.model';

@Component({
  selector: 'app-links',
  templateUrl: 'links.component.html',
  styleUrls: ['links.component.scss'],
  animations: [modalTranslateAnimation],
})
export class LinksComponent implements OnInit, OnDestroy {
  deleteId: string | null = null;
  deleteLoading: boolean = false;

  @Input({ required: true }) links: ILink[] = [];

  private linkStoreSubscription: Subscription | undefined;
  private queryParamsSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.linkStoreSubscription = this.store.select(selectLink).subscribe((linkState) => {
      if (this.deleteLoading && !linkState.loading.deleteLink) {
        this.onDeleteCancel();
      }

      this.deleteLoading = linkState.loading.deleteLink;
    });

    this.queryParamsSubscription = this.route.queryParams.subscribe((queryParams) => {
      this.deleteId = typeof queryParams['deleteLink'] === 'string' ? queryParams['deleteLink'] : null;
    });
  }

  ngOnDestroy() {
    this.linkStoreSubscription?.unsubscribe();
    this.queryParamsSubscription?.unsubscribe();
  }

  onEdit(id: string) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {
          addLink: '',
          link: id,
        },
      },
    );
  }

  onDelete(id: string) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {
          deleteLink: id,
        },
      },
    );
  }

  onDeleteCancel() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        replaceUrl: true,
        queryParams: {
          deleteLink: undefined,
        },
      },
    );
  }

  onDeleteSubmit() {
    if (!this.deleteId) {
      return;
    }

    this.store.dispatch(deleteLink({ payload: this.deleteId }));
  }
}
