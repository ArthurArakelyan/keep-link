import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { ProfileDeleteAccountComponent } from './profile-delete-account.component';

// Store
import { appReducer, AppStore } from '../../../store/app.reducer';
import * as fromUser from '../../../store/user';

describe('ProfileDeleteAccountComponent', () => {
  let component: ProfileDeleteAccountComponent;
  let fixture: ComponentFixture<ProfileDeleteAccountComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileDeleteAccountComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule, SharedModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(ProfileDeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the profile delete account', () => {
    expect(compiled.querySelector('.profile-delete-account')).toBeInstanceOf(HTMLFormElement);
    expect(compiled.querySelector('app-input[name="password"]')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('app-button')).toBeInstanceOf(HTMLElement);
  });

  it('should be possible to submit when the form is valid', () => {
    const button = compiled.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    component.deleteAccountForm.setValue({
      password: 'example',
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(fromUser.selectUser)
      .subscribe((userState) => {
        expect(userState.loading.deleteUser).toBeTrue();
      });
  });

  it('should not be possible to submit when the form is invalid', () => {
    const button = compiled.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    component.deleteAccountForm.setValue({
      password: 'weak',
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(fromUser.selectUser)
      .subscribe((userState) => {
        expect(userState.loading.deleteUser).toBeFalse();
      });
  });
});
