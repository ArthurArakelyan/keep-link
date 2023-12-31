import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ProfileComponent } from './profile.component';
import { ProfileNameComponent } from './profile-name/profile-name.component';
import { ProfileAvatarComponent } from './profile-avatar/profile-avatar.component';
import { ProfileEmailComponent } from './profile-email/profile-email.component';
import { ProfilePasswordComponent } from './profile-password/profile-password.component';
import { ProfileDeleteAccountComponent } from './profile-delete-account/profile-delete-account.component';

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
      {
        path: 'avatar',
        component: ProfileAvatarComponent,
      },
      {
        path: 'email',
        component: ProfileEmailComponent,
      },
      {
        path: 'password',
        component: ProfilePasswordComponent,
      },
      {
        path: 'delete-account',
        component: ProfileDeleteAccountComponent,
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
