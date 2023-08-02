import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { deleteFolder, selectFolder, selectFolders } from '../../../store/folder';

// Services
import { SizeService } from '../../../core/services/size.service';

// Utilities
import { alignFolders } from '../../../core/utilities/align-folders';

// Animations
import { modalTranslateAnimation } from '../../../core/animations/modal-translate.animation';

// Models
import { IFolder } from '../../../core/models/folder.model';

@Component({
  selector: 'app-folders',
  templateUrl: 'folders.component.html',
  styleUrls: ['folders.component.scss'],
  animations: [modalTranslateAnimation],
})
export class FoldersComponent implements OnInit, OnDestroy {
  alignedFolders: IFolder[][] = [];
  deleteId: string | null = null;
  deleteLoading: boolean = false;

  private folderStoreSubscription: Subscription | undefined;
  private queryParamsSubscription: Subscription | undefined;
  private sizeAndFolderSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStore>,
    private sizeService: SizeService,
  ) {}

  ngOnInit() {
    this.folderStoreSubscription = this.store.select(selectFolder).subscribe((folderState) => {
      if (this.deleteLoading && !folderState.loading.deleteFolder) {
        this.onDeleteCancel();
      }

      this.deleteLoading = folderState.loading.deleteFolder;
    });

    this.queryParamsSubscription = this.route.queryParams.subscribe((queryParams) => {
      this.deleteId = typeof queryParams['deleteFolder'] === 'string' ? queryParams['deleteFolder'] : null;
    });

    this.sizeAndFolderSubscription = combineLatest([
      this.store.select(selectFolders),
      this.sizeService.size$,
    ]).subscribe(([folders, size]) => {
      this.alignedFolders = alignFolders(folders, size);
    });
  }

  ngOnDestroy() {
    this.folderStoreSubscription?.unsubscribe();
    this.queryParamsSubscription?.unsubscribe();
    this.sizeAndFolderSubscription?.unsubscribe();
  }

  onEdit(id: string) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {
          addLink: '',
          folder: id,
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
          deleteFolder: id,
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
          deleteFolder: undefined,
        },
      },
    );
  }

  onDeleteSubmit() {
    if (!this.deleteId) {
      return;
    }

    this.store.dispatch(deleteFolder({ payload: this.deleteId }));
  }
}
