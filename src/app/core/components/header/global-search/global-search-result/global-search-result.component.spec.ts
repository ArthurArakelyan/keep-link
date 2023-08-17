import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Modules
import { SharedModule } from '../../../../../shared/shared.module';

// Components
import { GlobalSearchResultComponent } from './global-search-result.component';

describe('GlobalSearchResultComponent', () => {
  let component: GlobalSearchResultComponent;
  let fixture: ComponentFixture<GlobalSearchResultComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalSearchResultComponent],
      imports: [SharedModule, RouterTestingModule],
    });

    fixture = TestBed.createComponent(GlobalSearchResultComponent);
    component = fixture.componentInstance;
    component.searchResult = {
      id: '1',
      name: 'Test',
      type: 'link',
    };
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the global search result', () => {
    expect(compiled.querySelector('.global-search-result')).toBeInstanceOf(HTMLButtonElement);
    expect(compiled.querySelector('app-link-icon')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('.global-search-result__name')).toBeInstanceOf(HTMLParagraphElement);
  });

  it('should show the results when there is children results', () => {
    component.searchResult.results = [
      {
        id: '1',
        name: 'Name',
        type: 'link',
      },
      {
        id: '2',
        name: 'Name 2',
        type: 'link',
      },
    ];

    fixture.detectChanges();

    expect(compiled.querySelector('.global-search-result__results'));

    const resultElements = compiled.querySelectorAll('app-global-search-result');

    expect(resultElements.length).toBe(component.searchResult.results.length);

    resultElements.forEach((element) => {
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });

  it('should not the results when there is no children results', () => {
    component.searchResult.results = undefined;

    fixture.detectChanges();

    expect(compiled.querySelector('.global-search-result__results')).toBeNull();
  });
});
