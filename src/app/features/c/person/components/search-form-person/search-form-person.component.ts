import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchPerson } from '@web/app/features/c/person/models/search-person.model';

@Component({
  selector: 'app-search-form-person',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-person.component.html',
  styles: []
})
export class SearchFormPersonComponent implements OnChanges, OnInit {

  @Input() query: SearchPerson;
  @Output() search = new EventEmitter<SearchPerson>();
  @Output() create = new EventEmitter<boolean>();
  @Output() resetSearch = new EventEmitter<boolean>();

  searchFormPerson = this.formBuilder.group({
    person: this.formBuilder.group({
      person_id: this.formBuilder.control(''),
      person_identification: this.formBuilder.control(''),
      person_names: this.formBuilder.control('')
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormPerson.setValue({
      person: {
        person_id: this.query.person.person_id,
        person_identification: this.query.person.person_identification,
        person_names: this.query.person.person_names
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.search.emit(this.searchFormPerson.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
