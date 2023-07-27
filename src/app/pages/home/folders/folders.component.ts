import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Models
import { IFolder } from '../../../core/models/folder.model';

@Component({
  selector: 'app-folders',
  templateUrl: 'folders.component.html',
  styleUrls: ['folders.component.scss'],
})
export class FoldersComponent {
  @Input({ required: true }) folders: IFolder[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  onEdit(id: string) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {
          addLink: '',
          folder: id,
        },
      },
    );
  }

  onDelete(id: string) {

  }
}
