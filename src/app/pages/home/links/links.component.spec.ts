import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
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
  let route: ActivatedRoute;

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
    route = TestBed.get<ActivatedRoute>(ActivatedRoute);
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

  it('should show the confirm modal when there is deleteLink in queryParams', fakeAsync(() => {
    component.onDelete('1');

    tick();
    fixture.detectChanges();

    expect(compiled.querySelector('app-confirm-modal')).toBeInstanceOf(HTMLElement);

    route.queryParams.subscribe((queryParams) => {
      expect(queryParams['deleteLink']).toBeTruthy();
    });
  }));

  it('should not show the confirm modal when there is no deleteLink in queryParams', fakeAsync(() => {
    component.onDelete('1');
    component.onDeleteCancel();

    tick();
    fixture.detectChanges();

    expect(compiled.querySelector('app-confirm-modal')).toBeNull();

    route.queryParams.subscribe((queryParams) => {
      expect(queryParams['deleteLink']).toBeFalsy();
    });
  }));
});
