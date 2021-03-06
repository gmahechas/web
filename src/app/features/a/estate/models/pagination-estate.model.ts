import { Estate } from '@web/app/features/a/estate/models/estate.model';

export interface PaginationEstate {
  paginationEstate: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: Estate[];
};
}
