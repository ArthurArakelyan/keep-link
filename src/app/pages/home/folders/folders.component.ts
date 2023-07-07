import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { selectFolder } from '../../../store/folder';

// Models
import { IFolder } from '../../../core/models/folder.model';

@Component({
  selector: 'app-folders',
  templateUrl: 'folders.component.html',
  styleUrls: ['folders.component.scss'],
})
export class FoldersComponent implements OnInit, OnDestroy {
  folders: IFolder[] = [];

  folderStoreSubscription: Subscription | undefined;

  constructor(
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.folderStoreSubscription = this.store.select(selectFolder).subscribe((folderState) => {
      this.folders = folderState.list;
    });
  }

  ngOnDestroy() {
    this.folderStoreSubscription?.unsubscribe();
  }
}
