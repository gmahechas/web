import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { City } from './../../models/city.model';
import { SearchCity } from './../../models/search-city.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-index-page-city',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './index-page-city.component.html',
  styles: []
})
export class IndexPageCityComponent implements OnInit {

  query$: Observable<SearchCity>;

  data$: Observable<City[]>;
  total$: Observable<number>;
  perPage$: Observable<number>;
  from$: Observable<number>;
  to$: Observable<number>;
  configTable: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.data$ = store.pipe(select(fromStore.getAllEntities));
    this.query$ = store.pipe(select(fromStore.getQuery));
    this.total$ = store.pipe(select(fromStore.getTotal));
    this.perPage$ = store.pipe(select(fromStore.getPerPage));
    this.from$ = store.pipe(select(fromStore.getFrom));
    this.to$ = store.pipe(select(fromStore.getTo));
    this.configTable = {
      dataKey: 'city_id',
      cols: [
        { field: 'city_id', header: 'Id', style: { width: '5%' } },
        { field: 'city_name', header: 'Ciudad', style: { width: '45%' } },
        { field: 'city_code', header: 'Codigo', style: { width: '10%' } },
        { field: 'estate', subfield: 'estate_name', header: 'Estado', style: { 'width': '40%' } }
      ]
    };
  }

  ngOnInit() { }

  onLoad(citySearch: SearchCity) {
    this.store.dispatch(new fromStore.LoadEntity({
      city: citySearch.city,
      estate: citySearch.estate,
      limit: 20,
      page: 1
    }));
  }

  onCreate() {
    this.store.dispatch(new fromCore.Go({
      path: ['city', 'create']
    }));
  }

  onEdit(city: City) {
    this.store.dispatch(new fromCore.Go({
      path: ['city', city.city_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromStore.PaginateEntity(event.page + 1));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['city']
    }));
  }

}
