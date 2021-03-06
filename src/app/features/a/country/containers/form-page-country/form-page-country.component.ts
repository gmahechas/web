import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromCountry from '@web/app/features/a/country/store';
import * as fromCore from '@web/app/core/store';

import { Country } from '@web/app/features/a/country/models/country.model';
import { initialStateSelectedCountry } from '@web/app/features/a/country/models/selected-country.model';

@Component({
  selector: 'app-form-page-country',
  templateUrl: './form-page-country.component.html',
  styles: []
})
export class FormPageCountryComponent implements OnInit {

  pending$ = this.store.pipe(select(fromCountry.getPending));
  country$ = this.store.pipe(select(fromCountry.getSelectedByRouter));

  constructor(
    private store: Store<fromCountry.State>
  ) { }

  ngOnInit() {
  }

  onStore(country: Country) {
    this.store.dispatch(fromCountry.EntityActions.StoreEntity({ entity: country }));
  }

  onUpdate(country: Country) {
    this.store.dispatch(fromCountry.EntityActions.UpdateEntity({ entity: country }));
  }

  onCancel() {
    this.store.dispatch(fromCountry.EntityActions.SetSelected({ selected: initialStateSelectedCountry }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['country']
    }));
  }

  onDestroy(country: Country) {
    this.store.dispatch(fromCountry.EntityActions.DestroyEntity({ entity: country }));
  }
}
