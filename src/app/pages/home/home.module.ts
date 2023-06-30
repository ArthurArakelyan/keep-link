import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

// Components
import { HomeComponent } from './home.component';
import { FoldersComponent } from './folders/folders.component';
import { FolderComponent } from './folders/folder/folder.component';
import { LinksComponent } from './links/links.component';
import { LinkComponent } from './link/link.component';

@NgModule({
  declarations: [
    HomeComponent,
    FoldersComponent,
    FolderComponent,
    LinksComponent,
    LinkComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ],
})
export class HomeModule {

}
