import { Injectable } from '@angular/core';

import { UpdateProfile } from '@web/app/features/c/profile/models/update-profile.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProfileUpdateGQL extends Mutation<UpdateProfile> {

document: DocumentNode = gql`
  mutation updateProfile($profile_id: ID!, $profile_name: String) {
      updateProfile(profile_id: $profile_id, profile_name: $profile_name) {
        profile_id
        profile_name
      }
  }
`;

}
