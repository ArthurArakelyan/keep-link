import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

// Modules
import { ProfileModule } from './profile.module';

// Components
import { ProfileComponent } from './profile.component';

// Store
import { appReducer } from '../../store/app.reducer';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [RouterTestingModule, ProfileModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the profile', () => {
    expect(compiled.querySelector('app-profile-header')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('app-profile-tabs')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('.profile-tabs-wrapper__page')).toBeInstanceOf(HTMLDivElement);
  });
});
