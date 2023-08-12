import { NgModule } from '@angular/core';

// Components
import { SearchIconComponent } from './icons/search-icon/search-icon.component';
import { LinkIconComponent } from './icons/link-icon/link-icon.component';
import { GearIconComponent } from './icons/gear-icon/gear-icon.component';
import { UserIconComponent } from './icons/user-icon/user-icon.component';
import { PlusIconComponent } from './icons/plus-icon/plus-icon.component';
import { LogoutIconComponent } from './icons/logout-icon/logout-icon.component';
import { BurgerMenuIconComponent } from './icons/burger-menu-icon/burger-menu-icon.component';
import { WebIconComponent } from './icons/web-icon/web-icon.component';
import { RedirectIconComponent } from './icons/redirect-icon/redirect-icon.component';
import { EditIconComponent } from './icons/edit-icon/edit-icon.component';
import { DeleteIconComponent } from './icons/delete-icon/delete-icon.component';
import { MenuIconComponent } from './icons/menu-icon/menu-icon.component';
import { CloseIconComponent } from './icons/close-icon/close-icon.component';
import { ChevronDownIconComponent } from './icons/chevron-down-icon/chevron-down-icon.component';
import { FolderIconComponent } from './icons/folder-icon/folder-icon.component';
import { CopyIconComponent } from './icons/copy-icon/copy-icon.component';
import { UploadIconComponent } from './icons/upload-icon/upload-icon.component';

@NgModule({
  declarations: [
    SearchIconComponent,
    LinkIconComponent,
    GearIconComponent,
    UserIconComponent,
    PlusIconComponent,
    LogoutIconComponent,
    BurgerMenuIconComponent,
    WebIconComponent,
    RedirectIconComponent,
    EditIconComponent,
    DeleteIconComponent,
    MenuIconComponent,
    CloseIconComponent,
    ChevronDownIconComponent,
    FolderIconComponent,
    CopyIconComponent,
    UploadIconComponent,
  ],
  exports: [
    SearchIconComponent,
    LinkIconComponent,
    GearIconComponent,
    UserIconComponent,
    PlusIconComponent,
    LogoutIconComponent,
    BurgerMenuIconComponent,
    WebIconComponent,
    RedirectIconComponent,
    EditIconComponent,
    DeleteIconComponent,
    MenuIconComponent,
    CloseIconComponent,
    ChevronDownIconComponent,
    FolderIconComponent,
    CopyIconComponent,
    UploadIconComponent,
  ],
})
export class IconModule {

}
