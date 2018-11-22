import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromCity from '@web/app/features/a/city/store';
import * as fromCore from '@web/app/core/store';

import { City } from '@web/app/features/a/city/models/city.model';
import { SearchCity } from '@web/app/features/a/city/models/search-city.model';

@Component({
  selector: 'app-index-page-city',
  templateUrl: './index-page-city.component.html',
  styles: []
})
export class IndexPageCityComponent implements OnInit {

  query$ = this.store.pipe(select(fromCity.getQuery));

  data$ = this.store.pipe(select(fromCity.getAllEntities));
  total$ = this.store.pipe(select(fromCity.getTotal));
  perPage$ = this.store.pipe(select(fromCity.getPerPage));
  from$ = this.store.pipe(select(fromCity.getFrom));
  to$ = this.store.pipe(select(fromCity.getTo));
  configTable: any;

  constructor(
    private store: Store<fromCity.State>
  ) {
    this.configTable = {
      dataKey: 'city_id',
      cols: [
        { fields: ['city_id'], header: ['city.model.city_id'], style: { width: '5%' } },
        { fields: ['city_name'], header: ['city.model.city_name'], style: { width: '30%' } },
        { fields: ['city_code'], header: ['city.model.city_code'], style: { width: '10%' } },
        { fields: ['estate.estate_name'], header: ['estate.singular'], style: { 'width': '30%' } },
        { fields: ['estate.country.country_name'], header: ['country.singular'], style: { 'width': '25%' } }
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() { }

  onLoad(citySearch: SearchCity) {
    this.store.dispatch(new fromCity.LoadEntity({
      search: {
        city: citySearch.city,
        estate: citySearch.estate,
        limit: 20,
        page: 1
      }
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
    this.store.dispatch(new fromCity.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['city']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromCity.ResetSearch());
  }

}