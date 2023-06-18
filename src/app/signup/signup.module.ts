import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { SignupRoutingModule } from './signup-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { SignupComponent } from './signup.component';

@NgModule({
  declarations: [
    SignupComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    SignupRoutingModule,
  ],
})
export class SignupModule {

}
