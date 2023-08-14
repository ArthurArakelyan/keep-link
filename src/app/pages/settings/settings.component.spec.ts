import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

// Modules
import { SettingsModule } from './settings.module';

// Components
import { SettingsComponent } from './settings.component';

// Store
import { appReducer } from '../../store/app.reducer';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [RouterTestingModule, SettingsModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the settings', () => {
    expect(compiled.querySelector('app-settings-themes')).toBeInstanceOf(HTMLElement);
  });
});
