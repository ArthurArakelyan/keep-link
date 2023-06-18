import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Modules
import { LoginRoutingModule } from './login-routing.module';

// Components
import { LoginComponent } from './login.component';
import { AuthComponent } from '../shared/components/auth/auth.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { InputComponent } from '../shared/components/input/input.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    ButtonComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
  ],
})
export class LoginModule {

}
