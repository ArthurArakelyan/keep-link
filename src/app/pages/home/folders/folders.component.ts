import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { deleteFolder, selectFolder } from '../../../store/folder';

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
  deleteId: string | null = null;
  deleteLoading: boolean = false;

  @Input({ required: true }) folders: IFolder[] = [];

  private folderStoreSubscription: Subscription | undefined;
  private queryParamsSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStore>,
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
  }

  ngOnDestroy() {
    this.folderStoreSubscription?.unsubscribe();
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
