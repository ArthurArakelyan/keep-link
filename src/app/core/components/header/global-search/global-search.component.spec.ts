import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';

// Modules
import { SharedModule } from '../../../../shared/shared.module';
import { CoreModule } from '../../../core.module';

// Store
import { appReducer, AppStore } from '../../../../store/app.reducer';

// Components
import { GlobalSearchComponent } from './global-search.component';

// Models
import { ISearchResult } from '../../../models/search.model';

describe('GlobalSearchComponent', () => {
  let component: GlobalSearchComponent;
  let fixture: ComponentFixture<GlobalSearchComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalSearchComponent],
      imports: [SharedModule, CoreModule, BrowserAnimationsModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(GlobalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the global search', () => {
    const searchResults: ISearchResult[] = [
      {
        id: '1',
        type: 'folder',
        name: 'Folder',
      },
      {
        id: '2',
        type: 'link',
        name: 'Link',
      },
      {
        id: '3',
        type: 'folder',
        name: 'Folder with links',
      },
    ];

    component.searchResults = searchResults;

    fixture.detectChanges();

    const searchResultElements = compiled.querySelectorAll('app-global-search-result');

    expect(searchResultElements.length).toBe(searchResults.length);

    searchResultElements.forEach((element) => {
      expect(element).toBeInstanceOf(HTMLElement);
    });

    expect(compiled.querySelector('.global-search-empty')).toBeNull();
  });

  it('should show empty design when there are no results', () => {
    component.search = 'test';
    component.searchResults = [];

    fixture.detectChanges();

    expect(compiled.querySelector('.global-search-empty')).toBeInstanceOf(HTMLParagraphElement);
  });
});
