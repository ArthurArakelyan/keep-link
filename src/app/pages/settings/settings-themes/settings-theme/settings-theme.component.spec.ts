import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';

// Components
import { SettingsThemeComponent } from './settings-theme.component';

// Store
import { appReducer, AppStore } from '../../../../store/app.reducer';
import { selectTheme } from '../../../../store/theme';

// Constants
import { themes } from '../../../../core/constants/themes';

describe('SettingsThemeComponent', () => {
  let component: SettingsThemeComponent;
  let fixture: ComponentFixture<SettingsThemeComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsThemeComponent],
      imports: [RouterTestingModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(SettingsThemeComponent);
    component = fixture.componentInstance;
    component.theme = themes[0];
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the settings theme', () => {
    expect(compiled.querySelector('.settings-theme')).toBeInstanceOf(HTMLButtonElement);
    expect(compiled.querySelector('.settings-theme__preview')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector<HTMLSpanElement>('.settings-theme__name')!.innerText).toBe(themes[0].name);
  });

  it('should render second preview theme', () => {
    expect(compiled.querySelector('.settings-theme__preview--second')).toBeInstanceOf(HTMLElement);
  });

  it('should not render second preview theme when it is not provided', () => {
    component.theme = themes[1];

    fixture.detectChanges();

    expect(compiled.querySelector('.settings-theme__preview--second')).toBeNull();
  });

  it('should dispatch changeTheme on click', () => {
    component.theme = themes[2];

    fixture.detectChanges();

    const themeButton = compiled.querySelector<HTMLButtonElement>('.settings-theme')!;

    themeButton.click();

    fixture.detectChanges();

    store.select(selectTheme).subscribe((themeState) => {
      expect(themeState.theme).toBe(component.theme.theme);
    });
  });
});
