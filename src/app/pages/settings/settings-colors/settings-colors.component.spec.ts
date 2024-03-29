import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

// Components
import { SettingsColorsComponent } from './settings-colors.component';
import { SettingsColorComponent } from './settings-color/settings-color.component';

// Store
import { appReducer } from '../../../store/app.reducer';

// Constants
import { colors } from '../../../core/constants/colors';

describe('SettingsThemesComponent', () => {
  let component: SettingsColorsComponent;
  let fixture: ComponentFixture<SettingsColorsComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsColorsComponent, SettingsColorComponent],
      imports: [StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(SettingsColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the settings colors', () => {
    expect(compiled.querySelector('.settings-colors-title')).toBeInstanceOf(HTMLHeadingElement);
    expect(compiled.querySelector('.settings-colors-list')).toBeInstanceOf(HTMLDivElement);

    const colorElements = compiled.querySelectorAll('app-settings-color');

    expect(colorElements.length).toBe(colors.length);

    colorElements.forEach((colorElement) => {
      expect(colorElement).toBeInstanceOf(HTMLElement);
    });
  });
});
