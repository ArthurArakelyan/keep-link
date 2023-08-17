import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../../store/app.reducer';
import { selectFolders } from '../../../../store/folder';
import { selectLinksWithFolder } from '../../../../store/link';

// Models
import { IFolder } from '../../../../core/models/folder.model';
import { ILink } from '../../../../core/models/link.model';

@Component({
  selector: 'app-folder-modal',
  templateUrl: 'folder-modal.component.html',
  styleUrls: ['folder-modal.component.scss'],
})
export class FolderModalComponent implements OnInit, OnDestroy {
  folder: IFolder | null = null;
  links: ILink[] = [];

  @Input({ required: true }) folderId: string | null = null;

  private foldersSubscription: Subscription | undefined;
  private linksWithFolderSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.foldersSubscription = this.store.select(selectFolders).subscribe((folders) => {
      if (this.folderId) {
        this.folder = folders.find((folder) => folder.id === this.folderId) || null;
      }
    });

    this.linksWithFolderSubscription = this.store.select(selectLinksWithFolder).subscribe((links) => {
      if (this.folder) {
        this.links = links.filter((link) => {
          return link.folderId === this.folder!.id;
        });
      }
    });
  }

  ngOnDestroy() {
    this.foldersSubscription?.unsubscribe();
    this.linksWithFolderSubscription?.unsubscribe();
  }

  onClose() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        replaceUrl: true,
        queryParams: {
          folder: undefined,
        },
      },
    );
  }

  onEditLink(id: string) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {
          hideFolder: '',
          addLink: '',
          editLink: id,
        },
      },
    );
  }

  onDeleteLink(id: string) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {
          hideFolder: '',
          deleteLink: id,
        },
      },
    );
  }

  onAddLink() {
    if (!this.folder) {
      return;
    }

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {
          hideFolder: '',
          addLink: '',
          linkFolder: this.folder.id,
        },
      },
    );
  }

  onEditFolder() {
    if (!this.folder) {
      return;
    }

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {
          hideFolder: '',
          addLink: '',
          editFolder: this.folder.id,
        },
      },
    );
  }

  onDeleteFolder() {
    if (!this.folder) {
      return;
    }

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {
          hideFolder: '',
          deleteFolder: this.folder.id,
        },
      },
    );
  }
}
