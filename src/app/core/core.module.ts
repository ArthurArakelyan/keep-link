import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { HeaderComponent } from './components/header/header.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SideMenuResponsiveComponent } from './components/side-menu-responsive/side-menu-responsive.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { AddLinkComponent } from './components/add-link/add-link.component';
import { GlobalSearchComponent } from './components/header/global-search/global-search.component';
import { GlobalSearchResultComponent } from './components/header/global-search/global-search-result/global-search-result.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderMenuComponent,
    SideMenuComponent,
    SideMenuResponsiveComponent,
    UserLayoutComponent,
    AddLinkComponent,
    GlobalSearchComponent,
    GlobalSearchResultComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    UserLayoutComponent,
  ],
})
export class CoreModule {

}
