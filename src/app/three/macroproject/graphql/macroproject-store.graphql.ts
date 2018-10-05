import { Injectable } from '@angular/core';

import { StoreMacroproject } from '@web/app/three/macroproject/models/store-macroproject.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class MacroprojectStoreGQL extends Mutation<StoreMacroproject> {

document: DocumentNode = gql`
  mutation storeMacroproject(
      $macroproject_name: String,
      $macroproject_address: String,
      $macroproject_phone: String,
      $city_id: ID,
      $office_id: ID
    ) {
    storeMacroproject(
      macroproject_name: $macroproject_name,
      macroproject_address: $macroproject_address,
      macroproject_phone: $macroproject_phone,
      city_id: $city_id,
      office_id: $office_id,
    ) {
      macroproject_id
      macroproject_name
      macroproject_address
      macroproject_phone
      macroproject_created_at
      macroproject_updated_at
      macroproject_deleted_at
      city_id
      city {
        city_id
        city_name
        city_code
        city_created_at
        city_updated_at
        city_deleted_at
      }
      office_id
      office {
        office_id
        office_name
        office_created_at
        office_updated_at
        office_deleted_at
      }
    }
  }
`;

}
