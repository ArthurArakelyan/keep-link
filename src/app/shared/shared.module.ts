import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    AuthComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    AuthComponent,
    LoaderComponent,
  ],
})
export class SharedModule {

}
