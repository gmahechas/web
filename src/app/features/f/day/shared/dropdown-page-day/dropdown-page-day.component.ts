import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromDay from '@web/app/features/f/day/store';
import { initialState } from '@web/app/features/f/day/store/reducers/search-day.reducer';

import { SearchDay } from '@web/app/features/f/day/models/search-day.model';

@Component({
  selector: 'app-dropdown-page-day',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-day.component.html',
  styles: []
})
export class DropdownPageDayComponent implements OnChanges, OnInit {

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
  @Input() searchDay: SearchDay;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromDay.getAllEntities));
  entityId = 'day_id';

  constructor(
    private store: Store<fromDay.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(fromDay.EntityActions.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchDay) {
      setTimeout(() => {
        this.onLoad({
          day: (this.searchDay.day) ? this.searchDay.day : null
        });
      });
    }
  }

  onLoad(searchDay: SearchDay) {
    this.store.dispatch(fromDay.EntityActions.LoadEntityShared({
      search: searchDay
    }));
  }

  keyUp(event) {
    this.onLoad({
      day: {
        ...initialState.query.day,
        [this.optionLabel]: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
