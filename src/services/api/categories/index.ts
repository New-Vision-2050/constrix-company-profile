import { baseApi } from "@/lib/axios/instances/base";
import { ListCategoriesResponse } from "./response";

export interface CategoriesFilters {
  page?: number;
  per_page?: number;
}

export const CategoriesApi = {
  list: (filters?: CategoriesFilters) =>
    baseApi.get<ListCategoriesResponse>("/categories-website", { params: filters }),
  projectsCategories: () =>
    baseApi.get<ListCategoriesResponse>("/website-project-settings/all"),
};

