import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../../store/app.reducer';
import { selectLinksWithFolder } from '../../../../store/link';

// Models
import { IFolder } from '../../../../core/models/folder.model';
import { ILink } from '../../../../core/models/link.model';

@Component({
  selector: 'app-folder',
  templateUrl: 'folder.component.html',
  styleUrls: ['folder.component.scss'],
})
export class FolderComponent implements OnInit, OnDestroy {
  links: ILink[] = [];

  @Input({ required: true }) folder!: IFolder;

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  private linksWithFolderSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.linksWithFolderSubscription = this.store.select(selectLinksWithFolder).subscribe((links) => {
      this.links = links.filter((link) => {
        return link.folderId === this.folder.id;
      });
    });
  }

  ngOnDestroy() {
    this.linksWithFolderSubscription?.unsubscribe();
  }

  onEdit() {
    this.edit.emit(this.folder.id);
  }

  onDelete() {
    this.delete.emit(this.folder.id);
  }

  onAddLink() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {
          addLink: '',
          linkFolder: this.folder.id,
        },
      },
    );
  }
}
