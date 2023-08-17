import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, take } from 'rxjs';

// Store
import { AppStore } from '../../../../store/app.reducer';
import { selectFolders } from '../../../../store/folder';
import { selectLinks } from '../../../../store/link';

// Models
import { ISearchItem, ISearchResult, SearchResultType } from '../../../models/search.model';

@Component({
  selector: 'app-global-search',
  templateUrl: 'global-search.component.html',
  styleUrls: ['global-search.component.scss']
})
export class GlobalSearchComponent implements OnChanges {
  searchResults: ISearchResult[] = [];

  @Input({ required: true }) search: string = '';

  @Output() clearSearch = new EventEmitter();

  constructor(
    private store: Store<AppStore>,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['search']) {
      this.onSearch(changes['search'].currentValue);
    }
  }

  onClearSearch() {
    this.clearSearch.emit();

    this.searchResults = [];
  }

  private onSearch(value: string) {
    combineLatest(
      [
        this.store.select(selectFolders),
        this.store.select(selectLinks),
      ],
    ).pipe(
      take(1),
    ).subscribe(([folders, links]) => {
      const foundFolders = folders
        .filter(this.createFilterCallback(value));

      const foundLinks = links
        .filter(this.createFilterCallback(value));

      const foundLinksWithFolderId = foundLinks
        .filter((link) => link.folderId);

      const foldersWithLinksResults: ISearchResult[] = folders
        .filter((folder) => foundLinksWithFolderId.find((link) => link.folderId === folder.id))
        .map((folder) => {
          return {
            id: folder.id,
            name: folder.name,
            type: 'folder',
            results: foundLinksWithFolderId
              .filter((link) => link.folderId === folder.id)
              .map(this.createSearchDataMapCallback('link')),
          };
        });

      const folderResults: ISearchResult[] = foundFolders
        .filter((folder) => !foldersWithLinksResults.find((f) => f.id === folder.id))
        .map(this.createSearchDataMapCallback('folder'));

      const linkResults: ISearchResult[] = foundLinks
        .filter((link) => !link.folderId)
        .map(this.createSearchDataMapCallback('link'));

      this.searchResults = [
        ...foldersWithLinksResults,
        ...folderResults,
        ...linkResults,
      ];
    });
  }

  private createFilterCallback(value: string) {
    return (item: ISearchItem) => item.name.toLowerCase().includes(value.toLowerCase());
  }

  private createSearchDataMapCallback(type: SearchResultType) {
    return (item: ISearchItem): ISearchResult => {
      return {
        id: item.id,
        name: item.name,
        type,
      };
    };
  }
}
