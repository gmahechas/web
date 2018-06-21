import { Injectable } from '@angular/core';

import { Apollo, QueryRef } from 'apollo-angular';
import * as fromGraphql from './../graphql/estate.graphql';

import * as fromModels from './../models';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstateService {

  queryRef: QueryRef<fromModels.PaginationEstate>;

  constructor(
    private apollo: Apollo
  ) { }

  load(searchEstate: fromModels.SearchEstate) {
    this.queryRef = this.apollo.watchQuery<fromModels.PaginationEstate, fromModels.SearchEstate>({
      query: fromGraphql.pagination,
      variables: searchEstate
    });

    return this.queryRef.valueChanges;
  }

  store(estate: fromModels.Estate): Observable<any> {
    return this.apollo.mutate<fromModels.StoreEstate>({
      mutation: fromGraphql.store,
      variables: estate
    });
  }

  update(estate: fromModels.Estate): Observable<any> {
    return this.apollo.mutate<fromModels.UpdateEstate>({
      mutation: fromGraphql.update,
      variables: estate
    });
  }

  destroy(estate: fromModels.Estate): Observable<any> {
    return this.apollo.mutate<fromModels.DestroyEstate>({
      mutation: fromGraphql.destroy,
      variables: {
        estate_id: estate.estate_id
      }
    });
  }

  pagination(searchEstate: fromModels.SearchEstate) {
    return this.queryRef.fetchMore({
      query: fromGraphql.pagination,
      variables: searchEstate,
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return fetchMoreResult.data;
      }
    });
  }

}
