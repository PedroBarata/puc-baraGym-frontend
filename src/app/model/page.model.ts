export interface Page<T> {
  content: Array<T>;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted:boolean;
  };

  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
