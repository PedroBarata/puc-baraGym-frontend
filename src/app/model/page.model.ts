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

  first: boolean = false;
  numberOfElements: number = 0;
  empty: boolean = true;
}
