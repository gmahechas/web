import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/core/store';
import * as fromActions from '@web/app/auth/store/actions';
import * as fromSelectors from '@web/app/auth/store/selectors';

import * as fromModels from '@web/app/auth/models';

import { AuthService } from '@web/app/auth/services/auth.service';

import { of, defer } from 'rxjs';
import { tap, map, switchMap, catchError, withLatestFrom, take } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType<fromActions.Login>(fromActions.AuthActionTypes.Login),
    map(action => action.payload.auth),
    switchMap((auth: fromModels.Auth) =>
      this.authService.login(auth).pipe(
        map(({ token, user, company }) => new fromActions.LoginSuccess({ token, user, company })),
        catchError(errors => of(new fromActions.LoginFailure({ errors })))
      )
    ));

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType<fromActions.LoginSuccess>(fromActions.AuthActionTypes.LoginSuccess),
    map(action => action.payload),
    tap(({ token, user, company }) => {
      this.authService.setToken(token);
      this.store.dispatch(new fromStore.Go({
        path: ['dashboard']
      }));
    })
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.LoginRedirect),
    tap(() => {
      this.authService.removeToken();
      this.store.dispatch(new fromStore.Go({
        path: ['auth']
      }));
    })
  );

  @Effect({ dispatch: false })
  refreshToken$ = this.actions$.pipe(
    ofType<fromActions.RefreshToken>(fromActions.AuthActionTypes.RefreshToken),
    tap((token) => {
      console.log('Update :) ::::', token);
    })
  );

  /*   @Effect({ dispatch: false })
    refreshTokenSuccess$ = this.actions$.pipe(
      ofType<fromActions.RefreshTokenSuccess>(fromActions.AuthActionTypes.RefreshTokenSuccess),
      map(action => action.payload),
      tap((token: fromModels.Token) => {
        this.authService.setToken(token);
      })
    ); */

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.Logout),
    tap(authed => {
      this.authService.removeToken();
      this.store.dispatch(new fromStore.Go({
        path: ['auth']
      }));
    })
  );

  @Effect({ dispatch: false })
  init$ = defer(() => {
    return of(this.authService.getToken());
  }).pipe(
    tap((token: fromModels.Token) => console.log(token))
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<fromStore.State>
  ) { }
}
