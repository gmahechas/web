import { Profile } from '@web/app/two/profile/models/profile.model';
import { Person } from '@web/app/two/person/models/person.model';

export interface SearchUser {
  user?: {
    user_id?: string;
    username?: string;
    email?: string;
  };
  person?: Person | null;
  profile?: Profile | null;
  limit?: number;
  page?: number;
}
