import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ForgotPasswordComponent } from './forgot-password.component';

// Guards
import { NoAuthGuard } from '../../core/guards/no-auth.guard';

const forgotPasswordRoutes: Routes = [
  {
    path: '',
    title: 'Forgot Password | KeepLink',
    component: ForgotPasswordComponent,
    canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(forgotPasswordRoutes)],
  exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {

}
