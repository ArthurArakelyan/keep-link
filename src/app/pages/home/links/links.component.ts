import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { deleteLink, selectLink, selectLinksWithoutFolder } from '../../../store/link';

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
  links: ILink[] = [];
  deleteId: string | null = null;
  deleteLoading: boolean = false;

  private linksWithoutFolderSubscription: Subscription | undefined;
  private linkStoreSubscription: Subscription | undefined;
  private queryParamsSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.linksWithoutFolderSubscription = this.store.select(selectLinksWithoutFolder).subscribe((links) => {
      this.links = links;
    });

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
    this.linksWithoutFolderSubscription?.unsubscribe();
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
          editLink: id,
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
          hideFolder: undefined,
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
