import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Models
import { ILink } from '../../../core/models/link.model';

@Component({
  selector: 'app-links',
  templateUrl: 'links.component.html',
  styleUrls: ['links.component.scss'],
})
export class LinksComponent {
  @Input({ required: true }) links: ILink[] = [];

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
          link: id,
        },
      },
    );
  }

  onDelete(id: string) {

  }
}
