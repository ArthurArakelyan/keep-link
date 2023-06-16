import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AppComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
