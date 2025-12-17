import { BE_BaseResponse } from "../base-response";

export interface BE_Pagination {
  page: number;
  next_page: number;
  last_page: number;
  result_count: number;
}

export interface BE_PaginatedResponse<T> extends BE_BaseResponse<T> {
  pagination?: BE_Pagination;
}
