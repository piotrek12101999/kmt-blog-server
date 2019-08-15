interface Pagination {
  first: number;
  skip: number;
  after: string;
}

export interface Query extends Pagination {
  query: string;
}
