import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ProfileComponent } from './profile.component';

// Guards
import { AuthGuard } from '../../core/guards/auth.guard';

const profileRoutes: Routes = [
  {
    path: '',
    title: 'Profile | KeepLink',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {

}
