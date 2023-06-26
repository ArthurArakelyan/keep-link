import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';

// Modules
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Components
import { ForgotPasswordComponent } from './forgot-password.component';

// Store
import { appReducer, AppStore } from '../../store/app.reducer';
import * as fromAuth from '../../store/auth';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, ForgotPasswordRoutingModule, SharedModule, RouterTestingModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the forgot password', () => {
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

    component.forgotPasswordForm.setValue({
      email: 'admin@mail.loc',
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(fromAuth.selectAuth)
      .subscribe((authState) => {
        expect(authState.loading.forgotPassword).toBeTrue();
      });
  });

  it('should not be possible to submit when the form is invalid', () => {
    const button = compiled.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    component.forgotPasswordForm.setValue({
      email: 'invalid',
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(fromAuth.selectAuth)
      .subscribe((authState) => {
        expect(authState.loading.forgotPassword).toBeFalse();
      });
  });
});
