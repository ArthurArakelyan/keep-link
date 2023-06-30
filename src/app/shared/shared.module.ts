import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { IconModule } from './components/icon/icon.module';

// Components
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';

// Pipes
import { ShortLinkPipe } from './pipes/short-link/short-link.pipe';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    AuthComponent,
    LoaderComponent,
    AvatarComponent,
    DropdownComponent,
    ShortLinkPipe,
  ],
  imports: [
    CommonModule,
    IconModule,
  ],
  exports: [
    CommonModule,
    IconModule,
    ButtonComponent,
    InputComponent,
    AuthComponent,
    LoaderComponent,
    AvatarComponent,
    DropdownComponent,
    ShortLinkPipe,
  ],
})
export class SharedModule {

}
