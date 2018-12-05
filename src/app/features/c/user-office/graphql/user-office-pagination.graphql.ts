import { Injectable } from '@angular/core';

import { PaginationUserOffice } from '@web/app/features/c/user-office/models/pagination-user-office.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class UserOfficePaginationGQL extends Query<PaginationUserOffice> {

document: DocumentNode = gql`
  query paginationUserOffice(
    $user_office_id: ID,
    $user_office_status: Boolean,
    $user_id: ID,
    $office_id: ID,
    $limit: Int,
    $page: Int
  ) {
    paginationUserOffice(
      user_office_id: $user_office_id,
      user_office_status: $user_office_status,
      user_id: $user_id,
      office_id: $office_id,
      limit: $limit,
      page: $page
    ) {
      total
      per_page
      current_page
      from
      to
      data {
        user_office_id
        user_office_status
        user_id
        user {
          user_id
          username
          email
          password
          remember_token
          person_id
          person {
            person_id
            person_business_type
            person_identification_type
            person_identification
            person_first_name
            person_second_name
            person_first_surname
            person_second_surname
            person_legal_name
            city_id
          }
          profile_id
        }
        office_id
        office {
          office_id
          office_name
          company_id
          city_id
        }
      }
    }
  }
`;
}
