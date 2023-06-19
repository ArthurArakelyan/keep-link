import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';

// Modules
import { SignupRoutingModule } from './signup-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Components
import { SignupComponent } from './signup.component';

// Store
import { appReducer, AppStore } from '../../store/app.reducer';
import * as fromAuth from '../../store/auth';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, SignupRoutingModule, SharedModule, RouterTestingModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the signup', () => {
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

    component.signupForm.setValue({
      name: 'Test',
      email: 'admin@mail.loc',
      password: '123456',
      confirmPassword: '123456',
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(fromAuth.selectAuth)
      .subscribe((authState) => {
        expect(authState.loading.signup).toBeTrue();
        expect(authState.isAuth).toBeFalse();
      });
  });

  it('should not be possible to submit when the form is invalid', () => {
    const button = compiled.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    component.signupForm.setValue({
      name: '',
      email: 'invalid',
      password: 'weak',
      confirmPassword: 'password',
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(fromAuth.selectAuth)
      .subscribe((authState) => {
        expect(authState.loading.signup).toBeFalse();
        expect(authState.isAuth).toBeFalse();
      });
  });
});
