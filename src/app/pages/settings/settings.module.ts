import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';

// Components
import { SettingsComponent } from './settings.component';
import { SettingsThemesComponent } from './settings-themes/settings-themes.component';
import { SettingsThemeComponent } from './settings-themes/settings-theme/settings-theme.component';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsThemesComponent,
    SettingsThemeComponent,
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
  ],
  exports: [
    SharedModule,
    SettingsRoutingModule,
    SettingsComponent,
    SettingsThemesComponent,
    SettingsThemeComponent,
  ],
})
export class SettingsModule {

}
