import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ProfileComponent } from './profile.component';
import { ProfileNameComponent } from './profile-name/profile-name.component';

// Guards
import { AuthGuard } from '../../core/guards/auth.guard';

const profileRoutes: Routes = [
  {
    path: '',
    title: 'Profile | KeepLink',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'name',
        component: ProfileNameComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {

}
