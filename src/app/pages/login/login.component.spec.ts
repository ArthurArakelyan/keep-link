import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';

// Modules
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Components
import { LoginComponent } from './login.component';

// Store
import { appReducer, AppStore } from '../../store/app.reducer';
import * as fromAuth from '../../store/auth';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, LoginRoutingModule, SharedModule, RouterTestingModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the login', () => {
    const authContainer = compiled.querySelector('app-auth');
    const form = compiled.querySelector('form');
    const inputs = compiled.querySelectorAll('app-input');
    const submitButton = compiled.querySelector('button[type="submit"]');

    expect(authContainer).toBeTruthy();
    expect(form).toBeTruthy();
    expect(submitButton).toBeTruthy();

    inputs.forEach((input) => {
      expect(input).toBeTruthy();
    });
  });

  it('should be possible to submit when the form is valid', () => {
    const button = compiled.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    component.loginForm.setValue({
      email: 'admin@mail.loc',
      password: '123456',
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(fromAuth.selectAuth)
      .subscribe((authState) => {
        expect(authState.loading.login).toBeTrue();
        expect(authState.isAuth).toBeFalse();
      });
  });

  it('should not be possible to submit when the form is invalid', () => {
    const button = compiled.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    component.loginForm.setValue({
      email: 'invalid',
      password: 'weak',
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(fromAuth.selectAuth)
      .subscribe((authState) => {
        expect(authState.loading.login).toBeFalse();
        expect(authState.isAuth).toBeFalse();
      });
  });
});
