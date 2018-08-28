import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../store';
import * as fromCore from './../../../core/store';

import { UserService } from './../services/user.service';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class UserExistGuard implements CanActivate {

  constructor(
    private store: Store<fromStore.State>,
    private userService: UserService
  ) { }

  /* FIXME: Always return 200 response */
  /*   hasInApi(user_id: string) {
      return this.userService.paginationUser({ user_id: +user_id }).pipe(
        map(({ data }) => new fromStore.EntityLoadSuccess(data)),
        tap((action: fromStore.EntityLoadSuccess) => this.store.dispatch(action)),
        map(action => action.payload),
        map(searchUser => !!searchUser),
        catchError(() => {
          this.store.dispatch(new fromCore.Go({
            path: ['not-found']
          }));
          return of(false);
        })
      );
    } */

  hasInStore(user_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getEntities),
      map(entities => !!entities[user_id]),
      take(1)
    );
  }

  hasEntity(user_id: string): Observable<boolean> {
    return this.hasInStore(user_id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        /* this.hasInApi(user_id); */
        this.store.dispatch(new fromCore.Go({
          path: ['not-found']
        }));
        return of(false);
      })
    );
  }

  checkStore(user_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadEntity({
            user: {
              user_id: user_id,
              username: '',
              email: ''
            },
            person: null,
            profile: null
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.user_id).pipe(
      switchMap(() => this.hasEntity(route.params.user_id))
    );
  }

}
