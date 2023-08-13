import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Components
import { ProfileTabsComponent } from './profile-tabs.component';

// Constants
import { profileTabs } from '../../../core/constants/profile-tabs';

describe('ProfileTabsComponent', () => {
  let component: ProfileTabsComponent;
  let fixture: ComponentFixture<ProfileTabsComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileTabsComponent],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(ProfileTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the profile tabs', () => {
    expect(compiled.querySelector('.profile-tabs')).toBeInstanceOf(HTMLUListElement);

    expect(component.profileTabs.length).toBe(profileTabs.length);

    const tabs = compiled.querySelectorAll('.profile-tab');

    expect(tabs.length).toBe(profileTabs.length);

    tabs.forEach((tab) => {
      expect(tab).toBeInstanceOf(HTMLLIElement);
    });
  });
});
