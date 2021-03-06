import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromTypePersonIdentification from '@web/app/features/c/type-person-identification/store';
import { initialState } from '@web/app/features/c/type-person-identification/store/reducers/search-type-person-identification.reducer';

import {
  SearchTypePersonIdentification
} from '@web/app/features/c/type-person-identification/models/search-type-person-identification.model';

@Component({
  selector: 'app-dropdown-page-type-person-identification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-type-person-identification.component.html',
  styles: []
})
export class DropdownPageTypePersonIdentificationComponent implements OnChanges, OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() filter = true;
  @Input() onlyShow: 'store' | 'store_form' | 'form' = 'store_form';
  @Input() placeholder: string[];
  @Input() filterPlaceholder: string[];
  @Input() showClear: boolean;
  @Input() dropdownIcon: string;
  @Input() emptyFilterMessage: string[];
  @Input() searchByKeyUp = true;
  @Input() isConditional = false;
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() loadOnInit = false;
  @Input() searchTypePersonIdentification: SearchTypePersonIdentification;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromTypePersonIdentification.getAllEntities));
  entityId = 'type_person_identification_id';

  constructor(
    private store: Store<fromTypePersonIdentification.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(fromTypePersonIdentification.EntityActions.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchTypePersonIdentification) {
      setTimeout(() => {
        this.onLoad({
          type_person_identification:
            (this.searchTypePersonIdentification.type_person_identification) ?
              this.searchTypePersonIdentification.type_person_identification : null
        });
      });
    }
  }

  onLoad(searchTypePersonIdentification: SearchTypePersonIdentification) {
    this.store.dispatch(fromTypePersonIdentification.EntityActions.LoadEntityShared({
      search: searchTypePersonIdentification
    }));
  }

  keyUp(event) {
    this.onLoad({
      type_person_identification: {
        ...initialState.query.type_person_identification,
        [this.optionLabel]: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
