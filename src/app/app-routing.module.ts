import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').then((module) => module.HomeModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then((module) => module.ProfileModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then((module) => module.SettingsModule),
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
