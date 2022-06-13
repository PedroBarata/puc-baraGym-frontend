export class Page<T> {
  content: Array<T> = [];
  last: boolean = true;
  totalElements: number = 0;
  totalPages: number = 0;
  size: number = 0;
  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };

  pageable?: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  };

  first: boolean = false;
  numberOfElements: number = 0;
  empty: boolean = true;
}
