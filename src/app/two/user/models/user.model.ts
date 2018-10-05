import { Profile } from '@app/app/two/profile/models/profile.model';
import { Person } from '@app/app/two/person/models/person.model';

export interface  User {
  user_id?: number;
  username?: string;
  email?: string;
  password?: string;
  remember_token?: string;
  user_created_at?: string;
  user_updated_at?: string;
  user_deleted_at?: string;
  person_id?: number;
  person?: Person;
  profile_id?: number;
  profile?: Profile;
}
