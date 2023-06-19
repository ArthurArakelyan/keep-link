import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './login.component';

// Guards
import { NoAuthGuard } from '../../core/guards/no-auth.guard';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {

}
