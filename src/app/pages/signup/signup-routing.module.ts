import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SignupComponent } from './signup.component';

// Guards
import { NoAuthGuard } from '../../core/guards/no-auth.guard';

const signupRoutes: Routes = [
  {
    path: '',
    title: 'Signup | KeepLink',
    component: SignupComponent,
    canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(signupRoutes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {

}
