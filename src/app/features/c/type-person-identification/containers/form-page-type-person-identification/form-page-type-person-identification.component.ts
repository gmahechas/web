import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromTypePersonIdentification from '@web/app/features/c/type-person-identification/store';
import * as fromCore from '@web/app/core/store';

import { TypePersonIdentification } from '@web/app/features/c/type-person-identification/models/type-person-identification.model';

@Component({
  selector: 'app-form-page-type-person-identification',
  templateUrl: './form-page-type-person-identification.component.html',
  styles: []
})
export class FormPageTypePersonIdentificationComponent implements OnInit {

  pending$ = this.store.pipe(select(fromTypePersonIdentification.getPending));
  typePersonIdentification$ = this.store.pipe(select(fromTypePersonIdentification.getSelectedByRouter));

  constructor(
    private store: Store<fromTypePersonIdentification.State>
  ) { }

  ngOnInit() {
  }

  onStore(typePersonIdentification: TypePersonIdentification) {
    this.store.dispatch(new fromTypePersonIdentification.StoreEntity({ entity: typePersonIdentification }));
  }

  onUpdate(typePersonIdentification: TypePersonIdentification) {
    this.store.dispatch(new fromTypePersonIdentification.UpdateEntity({ entity: typePersonIdentification }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['typePersonIdentification']
    }));
  }

  onDestroy(typePersonIdentification: TypePersonIdentification) {
    this.store.dispatch(new fromTypePersonIdentification.DestroyEntity({ entity: typePersonIdentification }));
  }
}