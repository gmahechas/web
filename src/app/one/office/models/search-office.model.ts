import { City } from '@app/app/one/city/models/city.model';

export interface SearchOffice {
  office?: {
    office_id?: string;
    office_name?: string;
  };
  city?: City | null;
  limit?: number;
  page?: number;
}
