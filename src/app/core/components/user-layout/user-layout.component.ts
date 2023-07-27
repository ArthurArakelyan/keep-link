import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { getUser } from '../../../store/user';

// Services
import { SizeService } from '../../services/size.service';

// Animations
import { modalTranslateAnimation } from '../../animations/modal-translate.animation';

@Component({
  selector: 'app-user-layout',
  templateUrl: 'user-layout.component.html',
  styleUrls: ['user-layout.component.scss'],
  animations: [modalTranslateAnimation],
})
export class UserLayoutComponent implements OnInit, OnDestroy {
  showSideMenuResponsive: boolean = false;
  isAddLinkModalOpen: boolean = false;

  private sizeSubscription: Subscription | undefined;
  private queryParamsSubscription: Subscription | undefined;

  constructor(
    private store: Store<AppStore>,
    private sizeService: SizeService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.store.dispatch(getUser());

    this.sizeSubscription = this.sizeService.size$.subscribe((size) => {
      this.showSideMenuResponsive = size._768;
    });

    this.queryParamsSubscription = this.route.queryParams
      .pipe(
        map((queryParams) => {
          return {
            addLink: queryParams['addLink'] !== undefined
          };
        }),
      )
      .subscribe((queryParams) => {
        this.isAddLinkModalOpen = queryParams.addLink;
      });
  }

  ngOnDestroy() {
    this.sizeSubscription?.unsubscribe();
    this.queryParamsSubscription?.unsubscribe();
  }
}
