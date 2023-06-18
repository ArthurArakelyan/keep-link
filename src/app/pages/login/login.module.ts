import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Components
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    LoginRoutingModule,
  ],
})
export class LoginModule {

}
