import { Component, Input } from '@angular/core';

// Models
import { IFolder } from '../../../../core/models/folder.model';

@Component({
  selector: 'app-folder',
  templateUrl: 'folder.component.html',
  styleUrls: ['folder.component.scss'],
})
export class FolderComponent {
  @Input({ required: true }) folder!: IFolder;

  onEdit() {

  }

  onDelete() {

  }
}
