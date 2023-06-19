import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';

// Store
import { AppStore } from '../../store/app.reducer';
import { selectAuth } from '../../store/auth';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard {
  constructor(
    private router: Router,
    private store: Store<AppStore>,
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(selectAuth).pipe(
      take(1),
      map((authState) => authState.isAuth),
      map((isAuth) => {
        if (!isAuth) {
          return true;
        }

        return this.router.createUrlTree(['/']);
      }),
    );
  }
}
