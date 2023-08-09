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
import { FolderModalComponent } from './folders/folder-modal/folder-modal.component';
import { FolderModalActionsBarComponent } from './folders/folder-modal/folder-modal-actions-bar/folder-modal-actions-bar.component';

@NgModule({
  declarations: [
    HomeComponent,
    FoldersComponent,
    FolderComponent,
    LinksComponent,
    LinkComponent,
    FolderModalComponent,FolderModalActionsBarComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ],
})
export class HomeModule {

}
