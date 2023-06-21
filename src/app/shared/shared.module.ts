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

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    AuthComponent,
    LoaderComponent,
    AvatarComponent,
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
  ],
})
export class SharedModule {

}
