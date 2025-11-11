import { BE_ServiceCategory } from "@/types/api/base/service-category";
import { BE_Pagination } from "@/types/api/common/pagination";

export type ListServiceCategoriesResponse = BE_Pagination<BE_ServiceCategory[]>;
export type ShowServiceCategoryResponse = BE_ServiceCategory;
export interface CreateServiceCategoryResponse extends BE_ServiceCategory {}
