import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromUserOffice from '@web/app/features/d/user-office-project/store';
import { initialState } from '@web/app/features/d/user-office-project/store/reducers/search-user-office-project.reducer';

import { SearchUserOfficeProject } from '@web/app/features/d/user-office-project/models/search-user-office-project.model';

@Component({
  selector: 'app-dropdown-page-user-office-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-user-office-project.component.html',
  styles: []
})
export class DropdownPageUserOfficeProjectComponent implements OnChanges, OnInit {

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
  @Input() searchUserOfficeProject: SearchUserOfficeProject;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromUserOffice.getAllEntities));
  entityId = 'user_office_project_id';

  constructor(
    private store: Store<fromUserOffice.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(fromUserOffice.EntityActions.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchUserOfficeProject) {
      setTimeout(() => {
        this.onLoad({
          user_office_project:
            (this.searchUserOfficeProject.user_office_project) ?
              this.searchUserOfficeProject.user_office_project : null,
          user_office:
            (this.searchUserOfficeProject.user_office) ?
              this.searchUserOfficeProject.user_office : null,
          project:
            (this.searchUserOfficeProject.project) ?
              this.searchUserOfficeProject.project : null
        });
      });
    }

  }

  onLoad(searchUserOfficeProject: SearchUserOfficeProject) {
    this.store.dispatch(fromUserOffice.EntityActions.LoadEntityShared({
      search: searchUserOfficeProject
    }));
  }

  keyUp(event) {
    this.onLoad({
      user_office_project:
        (this.searchUserOfficeProject) ?
          (this.searchUserOfficeProject.user_office_project) ?
            this.searchUserOfficeProject.user_office_project : null : null,
      user_office:
        (this.searchUserOfficeProject) ?
          (this.searchUserOfficeProject.user_office) ?
            this.searchUserOfficeProject.user_office : null : null,
      project:
        (this.searchUserOfficeProject.project) ?
          (this.searchUserOfficeProject.project) ?
            this.searchUserOfficeProject.project : null : null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
