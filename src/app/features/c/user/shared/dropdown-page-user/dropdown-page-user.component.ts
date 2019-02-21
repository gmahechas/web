import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromUser from '@web/app/features/c/user/store';

import { SearchUser } from '@web/app/features/c/user/models/search-user.model';

@Component({
  selector: 'app-dropdown-page-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-user.component.html',
  styles: []
})
export class DropdownPageUserComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() filter = true;
  @Input() placeholder: string[];
  @Input() filterPlaceholder: string[];
  @Input() showClear: boolean;
  @Input() dropdownIcon: string;
  @Input() emptyFilterMessage: string[];
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() isConditional = false;
  @Input() keyUpTimes = 3;
  @Input() searchUser: SearchUser;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromUser.getAllEntities));
  entityId = 'user_id';

  constructor(
    private store: Store<fromUser.State>
  ) { }

  ngOnInit() {
  }

  onLoad(searchUser: SearchUser) {
    this.store.dispatch(new fromUser.LoadEntityShared({
      search: searchUser
    }));
  }

  keyUp(event) {
    this.onLoad({
      user: {
        user_id: '',
        username: event
      },
      person: null,
      profile: null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
