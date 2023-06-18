import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Store
import { appReducer, AppStore } from './store/app.reducer';
import * as fromTheme from './store/theme';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [AppRoutingModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a class with theme', () => {
    store.select(fromTheme.selectTheme)
      .subscribe((themeState) => {
        expect(compiled.classList.contains(themeState.theme)).toBeTrue();
      });
  });

  it('should be able to dispatch the changeTheme', () => {
    const newTheme = 'dark';

    store.dispatch(fromTheme.changeTheme({ payload: newTheme }));

    expect(compiled.classList.contains(newTheme)).toBeTrue();
  });
});
