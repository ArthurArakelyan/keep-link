import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

// Components
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ForgotPasswordRoutingModule,
  ],
})
export class ForgotPasswordModule {

}
