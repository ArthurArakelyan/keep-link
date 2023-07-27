import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../store/app.reducer';
import { getFolders, selectFolder } from '../../store/folder';
import { getLinks, selectLink, selectLinksWithoutFolder } from '../../store/link';

// Models
import { IFolder } from '../../core/models/folder.model';
import { ILink } from '../../core/models/link.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  folders: IFolder[] = [];
  links: ILink[] = [];
  getFoldersLoading: boolean = false;
  getLinksLoading: boolean = false;

  private folderStoreSubscription: Subscription | undefined;
  private linkStoreSubscription: Subscription | undefined;
  private linksWithoutFolderSubscription: Subscription | undefined;

  get loading() {
    return (this.getLinksLoading || this.getFoldersLoading) && (!this.folders.length && !this.links.length);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.folderStoreSubscription = this.store.select(selectFolder).subscribe((folderState) => {
      this.folders = folderState.list;
      this.getFoldersLoading = folderState.loading.getFolders;
    });

    this.linkStoreSubscription = this.store.select(selectLink).subscribe((linkState) => {
      this.getLinksLoading = linkState.loading.getLinks;
    });

    this.linksWithoutFolderSubscription = this.store.select(selectLinksWithoutFolder).subscribe((links) => {
      this.links = links;
    });

    this.store.dispatch(getLinks());
    this.store.dispatch(getFolders());
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
        replaceUrl: true,
        queryParams: {
          addLink: '',
        },
      },
    );
  }
}
