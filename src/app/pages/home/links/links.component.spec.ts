import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { LinksComponent } from './links.component';
import { LinkComponent } from '../link/link.component';

// Store
import { appReducer, AppStore } from '../../../store/app.reducer';
import { getLinksFulfilled } from '../../../store/link';

// Models
import { ILink } from '../../../core/models/link.model';

describe('LinksComponent', () => {
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  const createLink = (name = 'test', link = 'https://www.google.com/', image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Homepage.svg/1200px-Google_Homepage.svg.png'): ILink => {
    return {
      id: Math.random().toString(),
      userId: '1',
      folderId: null,
      name,
      link,
      image,
      createdAt: 0,
    };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinksComponent, LinkComponent],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);

    store.dispatch(getLinksFulfilled({ payload: [createLink(), createLink('', ''), createLink('', '', ''), createLink('test', '', ''), createLink('', '', 'https://www.google.com/')] }));

    fixture.detectChanges();
  });

  it('should create the links', () => {
    const links = compiled.querySelectorAll('app-link');

    expect(links.length).toBe(component.links.length);

    links.forEach((link) => {
      expect(link).toBeInstanceOf(HTMLElement);
    });
  });

  it('should show the confirm modal when there is deleteLink in queryParams', () => {
    component.deleteId = '1';

    fixture.detectChanges();

    expect(compiled.querySelector('app-confirm-modal')).toBeInstanceOf(HTMLElement);
  });

  it('should not show the confirm modal when there is no deleteLink in queryParams', () => {
    component.deleteId = null;

    fixture.detectChanges();

    expect(compiled.querySelector('app-confirm-modal')).toBeNull();
  });
});
