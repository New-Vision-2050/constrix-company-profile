import { BE_Category } from "@/types/api/base/categories";
import { BE_PaginatedResponse } from "@/types/api/common/pagination";

export interface ListCategoriesResponse extends BE_PaginatedResponse<BE_Category[]> {}

