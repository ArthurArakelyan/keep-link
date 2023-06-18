import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    AuthComponent,
  ],
})
export class SharedModule {

}
