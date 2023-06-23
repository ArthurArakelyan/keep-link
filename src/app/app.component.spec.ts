import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './core/services/auth.service';
import { Store, StoreModule } from '@ngrx/store';
import { User } from '@angular/fire/auth';
import { takeWhile } from 'rxjs';

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
  let authServiceStub: Partial<AuthService> = {
    onAuthChanged(callback: (user: (User | null)) => any): () => void {
      return () => {};
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [AppRoutingModule, StoreModule.forRoot(appReducer), RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
      ],
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
        expect(compiled.className.includes(themeState.theme)).toBeTrue();
      });
  });

  it('should be able to dispatch the changeTheme', () => {
    const newTheme = 'dark';

    store.dispatch(fromTheme.changeTheme({ payload: newTheme }));

    store.select(fromTheme.selectTheme)
      .pipe(
        takeWhile((themeState) => themeState.theme === newTheme)
      )
      .subscribe(() => {
        expect(compiled.className.includes(newTheme)).toBeTrue();
      });
  });
});
