import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { ProfileNameComponent } from './profile-name.component';

// Store
import { appReducer, AppStore } from '../../../store/app.reducer';
import * as fromUser from '../../../store/user';

describe('ProfileNameComponent', () => {
  let component: ProfileNameComponent;
  let fixture: ComponentFixture<ProfileNameComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileNameComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule, SharedModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(ProfileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the profile name', () => {
    expect(compiled.querySelector('.profile-name')).toBeInstanceOf(HTMLFormElement);
    expect(compiled.querySelector('app-input[name="name"]')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('app-button')).toBeInstanceOf(HTMLElement);
  });

  it('should be possible to submit when the form is valid', () => {
    const button = compiled.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    component.nameForm.setValue({
      name: 'Valid',
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(fromUser.selectUser)
      .subscribe((userState) => {
        expect(userState.loading.editUserName).toBeTrue();
      });
  });

  it('should not be possible to submit when the form is invalid', () => {
    const button = compiled.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    component.nameForm.setValue({
      name: '',
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(fromUser.selectUser)
      .subscribe((userState) => {
        expect(userState.loading.editUserName).toBeFalse();
      });
  });
});
