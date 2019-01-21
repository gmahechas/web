import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromContextVarActions from '@web/app/features/e/context-var/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutContextVarEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromContextVarActions.EntityActionTypes.LoadEntity,
      fromContextVarActions.EntityActionTypes.StoreEntity,
      fromContextVarActions.EntityActionTypes.UpdateEntity,
      fromContextVarActions.EntityActionTypes.DestroyEntity,
      fromContextVarActions.EntityActionTypes.PaginateEntity,
      fromContextVarActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromContextVarActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromContextVarActions.EntityActionTypes.StoreSuccessEntity,
      fromContextVarActions.EntityActionTypes.UpdateSuccessEntity,
      fromContextVarActions.EntityActionTypes.DestroySuccessEntity
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
      fromContextVarActions.EntityActionTypes.LoadFailEntity,
      fromContextVarActions.EntityActionTypes.StoreFailEntity,
      fromContextVarActions.EntityActionTypes.UpdateFailEntity,
      fromContextVarActions.EntityActionTypes.DestroyFailEntity
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
      fromContextVarActions.EntityActionTypes.LoadEntity,
      fromContextVarActions.EntityActionTypes.StoreSuccessEntity,
      fromContextVarActions.EntityActionTypes.UpdateSuccessEntity,
      fromContextVarActions.EntityActionTypes.DestroySuccessEntity,
      fromContextVarActions.EntityActionTypes.ResetSearch
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['context_var'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) {}
}