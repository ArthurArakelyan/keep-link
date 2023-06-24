import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { UserLayoutComponent } from './user-layout.component';
import { HeaderComponent } from '../header/header.component';
import { SideMenuComponent } from '../side-menu/side-menu.component';

// Store
import { appReducer, AppStore } from '../../../store/app.reducer';

describe('UserLayoutComponent', () => {
  let component: UserLayoutComponent;
  let fixture: ComponentFixture<UserLayoutComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLayoutComponent, HeaderComponent, SideMenuComponent],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(UserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the user layout', () => {
    expect(compiled.querySelector('app-header')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('app-side-menu')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('main')).toBeInstanceOf(HTMLElement);
  });
});
