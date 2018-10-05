import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromReducers from '@app/app/one/city/store/reducers';
import * as fromSelectors from '@app/app/one/city/store/selectors';
import * as fromActions from '@app/app/one/city/store/actions';

import * as fromModels from '@app/app/one/city/models';

import { CityService } from '@app/app/one/city/services/city.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityCityEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromActions.LoadEntity>(fromActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getCurrentPage))
    ),
    switchMap(([searchCity, perPage, currentPage]: [fromModels.SearchCity, number, number]) => {
      perPage = (perPage) ? perPage : searchCity.limit;
      currentPage = (currentPage) ? currentPage : searchCity.page;
      return this.cityService.load({ ...searchCity, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
        catchError((errors) => {
          return of(new fromActions.LoadFailEntity({ error: errors }));
        })
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromActions.StoreEntity>(fromActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((city: fromModels.City) => {
      return this.cityService.store(city).pipe(
        map(({ data }) => new fromActions.StoreSuccessEntity({ entity: data })),
        catchError((errors) => of(new fromActions.StoreFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromActions.UpdateEntity>(fromActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((city: fromModels.City) => {
      return this.cityService.update(city).pipe(
        map(({ data }) => new fromActions.UpdateSuccessEntity({ entity: data })),
        catchError((errors) => of(new fromActions.UpdateFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromActions.DestroyEntity>(fromActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((city: fromModels.City) => {
      return this.cityService.destroy(city).pipe(
        map(({ data }) => new fromActions.DestroySuccessEntity({ entity: data })),
        catchError((errors) => of(new fromActions.DestroyFailEntity({ error: errors })))
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
    switchMap(([currentPage, perPage, searchCity]: [number, number, fromModels.SearchCity]) => {
      return from(this.cityService.pagination({ ...searchCity, limit: perPage, page: currentPage })).pipe(
        skip(1),
        map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
        catchError((errors) => of(new fromActions.LoadFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromActions.LoadEntityShared>(fromActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchCity: fromModels.SearchCity) => {
        if (
          searchCity.city.city_id === '' &&
          searchCity.city.city_name === '' &&
          searchCity.city.city_code === '' &&
          searchCity.estate === null
          ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.cityService.load({ ...searchCity, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
          catchError((errors) => {
            return of(new fromActions.LoadFailEntity({ error: errors }));
          })
        );

      })
    )

  constructor(
    private actions$: Actions,
    private cityService: CityService,
    private store: Store<fromReducers.State>
  ) { }
}
