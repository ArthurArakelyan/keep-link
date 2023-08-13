import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { ProfileHeaderComponent } from './profile-header.component';

// Store
import { appReducer } from '../../../store/app.reducer';

describe('ProfileComponent', () => {
  let component: ProfileHeaderComponent;
  let fixture: ComponentFixture<ProfileHeaderComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileHeaderComponent],
      imports: [RouterTestingModule, SharedModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(ProfileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the profile header', () => {
    expect(component).toBeTruthy();
  });

  it('should show header content when user exists', () => {
    component.user = {
      id: '1',
      name: 'Name',
      email: 'example@mail.loc',
      avatar: '',
    };

    fixture.detectChanges();

    expect(compiled.querySelector('app-avatar.profile-header-avatar')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('.profile-header-name')).toBeInstanceOf(HTMLSpanElement);
    expect(compiled.querySelector<HTMLSpanElement>('.profile-header-name')!.innerText).toBe(component.user.name);
  });

  it('should not show header content when user doesn\'t exist', () => {
    component.user = null;

    fixture.detectChanges();

    expect(compiled.querySelector('app-avatar.profile-header-avatar')).toBeNull();
    expect(compiled.querySelector('.profile-header-name')).toBeNull();
  });
});
