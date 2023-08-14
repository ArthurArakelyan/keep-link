import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, take, tap } from 'rxjs';

// Store
import { AppStore } from '../../store/app.reducer';
import { getFolders, selectFolder, selectFolderRequested } from '../../store/folder';
import { getLinks, selectLink, selectLinkRequested, selectLinksWithoutFolder } from '../../store/link';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  foldersLength: number = 0;
  linksLength: number = 0;
  getFoldersLoading: boolean = false;
  getLinksLoading: boolean = false;

  private folderStoreSubscription: Subscription | undefined;
  private linkStoreSubscription: Subscription | undefined;
  private linksWithoutFolderSubscription: Subscription | undefined;

  get loading() {
    return (this.getLinksLoading || this.getFoldersLoading) && (!this.foldersLength && !this.linksLength);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.folderStoreSubscription = this.store.select(selectFolder).subscribe((folderState) => {
      this.foldersLength = folderState.list.length;
      this.getFoldersLoading = folderState.loading.getFolders;
    });

    this.linkStoreSubscription = this.store.select(selectLink).subscribe((linkState) => {
      this.getLinksLoading = linkState.loading.getLinks;
    });

    this.linksWithoutFolderSubscription = this.store.select(selectLinksWithoutFolder).subscribe((links) => {
      this.linksLength = links.length;
    });

    this.getLinks();
    this.getFolders();
  }

  ngOnDestroy() {
    this.folderStoreSubscription?.unsubscribe();
    this.linkStoreSubscription?.unsubscribe();
    this.linksWithoutFolderSubscription?.unsubscribe();
  }

  onFabClick() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {
          addLink: '',
        },
      },
    );
  }

  private getLinks() {
    this.store.select(selectLinkRequested).pipe(
      take(1),
    ).subscribe((linksRequested) => {
      if (!linksRequested.getLinks) {
        this.store.dispatch(getLinks());
      }
    });
  }

  private getFolders() {
    this.store.select(selectFolderRequested).pipe(
      take(1),
    ).subscribe((folderRequested) => {
      if (!folderRequested.getFolders) {
        this.store.dispatch(getFolders());
      }
    });
  }
}
