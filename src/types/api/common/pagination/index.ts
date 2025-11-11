export interface BE_Pagination<List> {
  list: List;
  metadata: BE_PaginationMetadata;
}

export interface BE_PaginationMetadata {
  page: number;
  perPage: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
