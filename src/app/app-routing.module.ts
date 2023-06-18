import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AppComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((module) => module.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then((module) => module.SignupModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
