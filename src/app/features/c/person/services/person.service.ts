import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/c/person/graphql';

import * as fromModels from '@web/app/features/c/person/models';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  queryRef: QueryRef<fromModels.PaginationPerson>;

  constructor(
    private personPaginationGQL: fromGraphql.PersonPaginationGQL,
    private personStoreGQL: fromGraphql.PersonStoreGQL,
    private personUpdateGQL: fromGraphql.PersonUpdateGQL,
    private personDestroyGQL: fromGraphql.PersonDestroyGQL
  ) { }

  load(searchPerson: fromModels.SearchPerson) {
    this.queryRef = this.personPaginationGQL.watch({
      ...searchPerson.person,
      limit: searchPerson.limit,
      page: searchPerson.page
    });

    return this.queryRef.valueChanges;
  }

  store(person: fromModels.Person) {
    return this.personStoreGQL.mutate(person);
  }

  update(person: fromModels.Person) {
    return this.personUpdateGQL.mutate(person);
  }

  destroy(person: fromModels.Person) {
    return this.personDestroyGQL.mutate(person);
  }

  pagination(searchPerson: fromModels.SearchPerson) {
    return this.queryRef.fetchMore({
      query: this.personPaginationGQL.document,
      variables: {
        person_id: searchPerson.person.person_id,
        person_identification: searchPerson.person.person_identification,
        person_names: searchPerson.person.person_names,
        limit: searchPerson.limit,
        page: searchPerson.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return Object.assign({}, prev, [prev, fetchMoreResult]);
      }
    });
  }

}
