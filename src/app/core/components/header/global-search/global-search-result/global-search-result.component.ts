import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { ISearchResult } from '../../../../models/search.model';

@Component({
  selector: 'app-global-search-result',
  templateUrl: 'global-search-result.component.html',
  styleUrls: ['global-search-result.component.scss'],
})
export class GlobalSearchResultComponent {
  @Input({ required: true }) searchResult!: ISearchResult;

  @Output() clearSearch = new EventEmitter();

  constructor(
    private router: Router,
  ) {}

  onClick() {
    if (this.searchResult.type === 'link') {
      this.router.navigate(
        ['/'],
        {
          replaceUrl: true,
          fragment: `link-${this.searchResult.id}`,
        },
      );
    } else if (this.searchResult.type === 'folder') {
      this.router.navigate(
        ['/'],
        {
          queryParamsHandling: 'merge',
          queryParams: {
            folder: this.searchResult.id,
          },
        },
      );
    }

    this.onClearSearch();
  }

  onClearSearch() {
    this.clearSearch.emit();
  }
}
