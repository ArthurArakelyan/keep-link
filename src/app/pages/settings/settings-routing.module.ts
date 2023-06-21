import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SettingsComponent } from './settings.component';

// Guards
import { AuthGuard } from '../../core/guards/auth.guard';

const settingsRoutes: Routes = [
  {
    path: '',
    title: 'Settings | KeepLink',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {

}
