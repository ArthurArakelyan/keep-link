import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

// Components
import { ProfileComponent } from './profile.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ProfileTabsComponent } from './profile-tabs/profile-tabs.component';
import { ProfileNameComponent } from './profile-name/profile-name.component';
import { ProfileAvatarComponent } from './profile-avatar/profile-avatar.component';
import { ProfileEmailComponent } from './profile-email/profile-email.component';
import { ProfilePasswordComponent } from './profile-password/profile-password.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileHeaderComponent,
    ProfileTabsComponent,
    ProfileNameComponent,
    ProfileAvatarComponent,
    ProfileEmailComponent,
    ProfilePasswordComponent,
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {

}
