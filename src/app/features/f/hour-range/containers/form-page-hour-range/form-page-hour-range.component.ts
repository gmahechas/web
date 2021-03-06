import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromHourRange from '@web/app/features/f/hour-range/store';
import * as fromCore from '@web/app/core/store';

import { HourRange } from '@web/app/features/f/hour-range/models/hour-range.model';
import { initialStateSelectedHourRange } from '@web/app/features/f/hour-range/models/selected-hour-range.model';

@Component({
  selector: 'app-form-page-hour-range',
  templateUrl: './form-page-hour-range.component.html',
  styles: []
})
export class FormPageHourRangeComponent implements OnInit {

  pending$ = this.store.pipe(select(fromHourRange.getPending));
  hourRange$ = this.store.pipe(select(fromHourRange.getSelectedByRouter));

  constructor(
    private store: Store<fromHourRange.State>
  ) { }

  ngOnInit() {
  }

  onStore(hourRange: HourRange) {
    this.store.dispatch(fromHourRange.EntityActions.StoreEntity({ entity: hourRange }));
  }

  onUpdate(hourRange: HourRange) {
    this.store.dispatch(fromHourRange.EntityActions.UpdateEntity({ entity: hourRange }));
  }

  onCancel() {
    this.store.dispatch(fromHourRange.EntityActions.SetSelected({ selected: initialStateSelectedHourRange }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['hourRange']
    }));
  }

  onDestroy(hourRange: HourRange) {
    this.store.dispatch(fromHourRange.EntityActions.DestroyEntity({ entity: hourRange }));
  }
}
