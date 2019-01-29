import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromProfileActions from '@web/app/features/c/profile/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutProfileEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromProfileActions.EntityActionTypes.LoadEntity,
      fromProfileActions.EntityActionTypes.StoreEntity,
      fromProfileActions.EntityActionTypes.UpdateEntity,
      fromProfileActions.EntityActionTypes.DestroyEntity,
      fromProfileActions.EntityActionTypes.PaginateEntity,
      fromProfileActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromProfileActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromProfileActions.EntityActionTypes.StoreSuccessEntity,
      fromProfileActions.EntityActionTypes.UpdateSuccessEntity,
      fromProfileActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
      this.store.dispatch(new fromCore.ShowMessages({
        messages: [
          { severity: 'success', summary: 'Exito', detail: 'Se llevo a cabo', key: 'toast' }
        ]
      }));
    })
  );

  @Effect({ dispatch: false })
  fail$ = this.actions$.pipe(
    ofType(
      fromProfileActions.EntityActionTypes.LoadFailEntity,
      fromProfileActions.EntityActionTypes.StoreFailEntity,
      fromProfileActions.EntityActionTypes.UpdateFailEntity,
      fromProfileActions.EntityActionTypes.DestroyFailEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
      this.store.dispatch(new fromCore.ShowMessages({
        messages: [
          { severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error.', key: 'toast' }
        ]
      }));
    })
  );

  // Redirects
  @Effect({ dispatch: false })
  successRedirect$ = this.actions$.pipe(
    ofType(
      fromProfileActions.EntityActionTypes.LoadEntity,
      fromProfileActions.EntityActionTypes.StoreSuccessEntity,
      fromProfileActions.EntityActionTypes.UpdateSuccessEntity,
      fromProfileActions.EntityActionTypes.DestroySuccessEntity,
      fromProfileActions.EntityActionTypes.Reset
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['profile'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
