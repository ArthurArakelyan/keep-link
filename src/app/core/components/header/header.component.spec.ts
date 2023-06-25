import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { takeWhile } from 'rxjs';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Store
import { appReducer, AppStore } from '../../../store/app.reducer';
import * as fromAuth from '../../../store/auth';

// Components
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [SharedModule, BrowserAnimationsModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the header', () => {
    expect(compiled.querySelector('.search__input')).toBeInstanceOf(HTMLInputElement);
    expect(compiled.querySelector('svg.search__icon')).toBeInstanceOf(SVGSVGElement);
    expect(compiled.querySelector('.avatar__image')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('app-dropdown')).toBeInstanceOf(HTMLElement);
  });

  it('should focus the search input on icon click', () => {
    const input = compiled.querySelector<HTMLElement>('.search__input')!;
    const icon = compiled.querySelector<HTMLElement>('.search__icon')!;

    icon.dispatchEvent(new Event('click', { bubbles: true }));

    fixture.detectChanges();

    expect(document.activeElement).toBe(input);
  });

  it('should logout on logout button click', () => {
    // login
    const mockId = 'id';

    store.dispatch(fromAuth.loginFulfilled({ payload: mockId }));

    store.select(fromAuth.selectAuth)
      .pipe(
        takeWhile((authState) => authState.id === mockId),
      )
      .subscribe((authState) => {
        expect(authState.id).toBe(mockId);

        // logout
        store.dispatch(fromAuth.logout());

        store.select(fromAuth.selectAuth)
          .pipe(
            takeWhile((authState) => !authState.isAuth),
          )
          .subscribe((authState) => {
            expect(authState.isAuth).toBeFalse();
          });
      });
  });
});
