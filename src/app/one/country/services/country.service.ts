import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from './../graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  queryRef: QueryRef<fromModels.PaginationCountry>;

  constructor(
    private countryPagination: fromGraphql.CountryPaginationGQL,
    private countryStoreGQL: fromGraphql.CountryStoreGQL,
    private countryUpdateGQL: fromGraphql.CountryUpdateGQL,
    private countryDestroyGQL: fromGraphql.CountryDestroyGQL
  ) { }

  load(searchCountry: fromModels.SearchCountry) {
    this.queryRef = this.countryPagination.watch({
      ...searchCountry.country,
      limit: searchCountry.limit,
      page: searchCountry.page
    });

    return this.queryRef.valueChanges;
  }

  store(country: fromModels.Country) {
    return this.countryStoreGQL.mutate(country);
  }

  update(country: fromModels.Country) {
    return this.countryUpdateGQL.mutate(country);
  }

  destroy(country: fromModels.Country) {
    return this.countryDestroyGQL.mutate(country);
  }

  pagination(searchCountry: fromModels.SearchCountry) {

    return this.queryRef.fetchMore({
      query: this.countryPagination.document,
      variables: {
        country_id: searchCountry.country.country_id,
        country_name: searchCountry.country.country_name,
        country_code: searchCountry.country.country_code,
        limit: searchCountry.limit,
        page: searchCountry.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return fetchMoreResult;
      }
    });
  }

}
