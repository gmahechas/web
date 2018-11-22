import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromReducers from '@web/app/features/b/office/store/reducers';
import * as fromSelectors from '@web/app/features/b/office/store/selectors';
import * as fromActions from '@web/app/features/b/office/store/actions';

import * as fromModels from '@web/app/features/b/office/models';

import { OfficeService } from '@web/app/features/b/office/services/office.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityOfficeEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromActions.LoadEntity>(fromActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getCurrentPage))
    ),
    switchMap(([searchOffice, perPage, currentPage]: [fromModels.SearchOffice, number, number]) => {
      perPage = (perPage) ? perPage : searchOffice.limit;
      currentPage = (currentPage) ? currentPage : searchOffice.page;
      return this.officeService.load({ ...searchOffice, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromActions.StoreEntity>(fromActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((office: fromModels.Office) => {
      return this.officeService.store(office).pipe(
        map(({ data }) => new fromActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromActions.StoreFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromActions.UpdateEntity>(fromActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((office: fromModels.Office) => {
      return this.officeService.update(office).pipe(
        map(({ data }) => new fromActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromActions.DestroyEntity>(fromActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((office: fromModels.Office) => {
      return this.officeService.destroy(office).pipe(
        map(({ data }) => new fromActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromActions.PaginateEntity>(fromActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchOffice]: [number, number, fromModels.SearchOffice]) => {
      return from(this.officeService.pagination({ ...searchOffice, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromActions.LoadEntityShared>(fromActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchOffice: fromModels.SearchOffice) => {
        if (
          searchOffice.office.office_id === '' &&
          searchOffice.office.office_name === '' &&
          searchOffice.city === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.officeService.load({ ...searchOffice, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromActions.LoadFailEntity({ error })))
        );
      })
    )

  constructor(
    private actions$: Actions,
    private officeService: OfficeService,
    private store: Store<fromReducers.State>
  ) { }
}