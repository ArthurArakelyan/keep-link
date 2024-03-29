import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';

// Components
import { SettingsColorComponent } from './settings-color.component';

// Store
import { appReducer, AppStore } from '../../../../store/app.reducer';
import { selectTheme } from '../../../../store/theme';

// Constants
import { colors } from '../../../../core/constants/colors';

describe('SettingsThemeComponent', () => {
  let component: SettingsColorComponent;
  let fixture: ComponentFixture<SettingsColorComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsColorComponent],
      imports: [RouterTestingModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(SettingsColorComponent);
    component = fixture.componentInstance;
    component.color = colors[0];
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the settings color', () => {
    expect(compiled.querySelector('.settings-color')).toBeInstanceOf(HTMLButtonElement);
  });

  it('should dispatch changeColor on click', () => {
    component.color = colors[1];

    fixture.detectChanges();

    const colorButton = compiled.querySelector<HTMLButtonElement>('.settings-color')!;

    colorButton.click();

    fixture.detectChanges();

    store.select(selectTheme).subscribe((themeState) => {
      expect(themeState.color).toBe(component.color.name);
    });
  });
});
