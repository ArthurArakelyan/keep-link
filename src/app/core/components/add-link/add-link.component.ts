import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-link',
  templateUrl: 'add-link.component.html',
  styleUrls: ['add-link.component.scss'],
})
export class AddLinkComponent implements OnInit, OnDestroy {
  open: boolean = false;

  private queryParamsSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams.subscribe((queryParams) => {
      this.open = queryParams['addLink'] !== undefined;
    });
  }

  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe();
  }

  onClose() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        replaceUrl: true,
        queryParams: {
          addLink: undefined,
        },
      },
    );
  }
}
