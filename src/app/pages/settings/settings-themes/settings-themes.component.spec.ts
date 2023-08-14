import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

// Components
import { SettingsThemesComponent } from './settings-themes.component';
import { SettingsThemeComponent } from './settings-theme/settings-theme.component';

// Store
import { appReducer } from '../../../store/app.reducer';

// Constants
import { themes } from '../../../core/constants/themes';

describe('SettingsThemesComponent', () => {
  let component: SettingsThemesComponent;
  let fixture: ComponentFixture<SettingsThemesComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsThemesComponent, SettingsThemeComponent],
      imports: [StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(SettingsThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the settings themes', () => {
    expect(compiled.querySelector('.settings-themes-title')).toBeInstanceOf(HTMLHeadingElement);
    expect(compiled.querySelector('.settings-themes-list')).toBeInstanceOf(HTMLDivElement);

    const themeElements = compiled.querySelectorAll('app-settings-theme');

    expect(themeElements.length).toBe(themes.length);

    themeElements.forEach((themeElement) => {
      expect(themeElement).toBeInstanceOf(HTMLElement);
    });
  });
});
