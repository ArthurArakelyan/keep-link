import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { ProfileAvatarComponent } from './profile-avatar.component';

// Store
import { appReducer, AppStore } from '../../../store/app.reducer';
import * as fromUser from '../../../store/user';

describe('ProfileAvatarComponent', () => {
  let component: ProfileAvatarComponent;
  let fixture: ComponentFixture<ProfileAvatarComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileAvatarComponent],
      imports: [ReactiveFormsModule, ToastrModule.forRoot({ preventDuplicates: true, }), BrowserAnimationsModule, RouterTestingModule, SharedModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(ProfileAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the profile avatar', () => {
    expect(component).toBeTruthy();
  });

  it('should show profile avatar content when the user exists', () => {
    component.user = {
      id: '1',
      name: 'Name',
      email: 'example@mail.loc',
      avatar: 'https://www.google.com/favicon.ico',
    };

    fixture.detectChanges();

    expect(compiled.querySelector('.profile-avatar')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelectorAll('.profile-avatar__actions-button').length).toBe(2);
    expect(compiled.querySelector('app-avatar.profile-avatar__image')).toBeInstanceOf(HTMLElement);
  });

  it('should now show profile avatar content when the user doesn\'t exist', () => {
    component.user = null;

    fixture.detectChanges();

    expect(compiled.querySelector('.profile-avatar')).toBeNull();
  });

  it('should now show delete avatar button when the avatar doesn\'t exist', () => {
    component.user = {
      id: '1',
      name: 'Name',
      email: 'example@mail.loc',
      avatar: '',
    };

    fixture.detectChanges();

    expect(compiled.querySelector('.profile-avatar__actions-button app-close-icon')).toBeNull();
  });

  it('should show the confirm modal when there is deleteAvatar in queryParams', () => {
    component.isDeleteAvatarOpen = true;

    fixture.detectChanges();

    expect(compiled.querySelector('app-confirm-modal')).toBeInstanceOf(HTMLElement);
  });

  it('should not show the confirm modal when there is no deleteAvatar in queryParams', () => {
    component.isDeleteAvatarOpen = false;

    fixture.detectChanges();

    expect(compiled.querySelector('app-confirm-modal')).toBeNull();
  });
});
