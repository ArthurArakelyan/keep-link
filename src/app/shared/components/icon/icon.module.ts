import { NgModule } from '@angular/core';

// Components
import { SearchIconComponent } from './icons/search-icon/search-icon.component';
import { LinkIconComponent } from './icons/link-icon/link-icon.component';
import { GearIconComponent } from './icons/gear-icon/gear-icon.component';
import { UserIconComponent } from './icons/user-icon/user-icon.component';
import { PlusIconComponent } from './icons/plus-icon/plus-icon.component';
import { LogoutIconComponent } from './icons/logout-icon/logout-icon.component';

@NgModule({
  declarations: [
    SearchIconComponent,
    LinkIconComponent,
    GearIconComponent,
    UserIconComponent,
    PlusIconComponent,
    LogoutIconComponent,
  ],
  exports: [
    SearchIconComponent,
    LinkIconComponent,
    GearIconComponent,
    UserIconComponent,
    PlusIconComponent,
    LogoutIconComponent,
  ],
})
export class IconModule {

}
