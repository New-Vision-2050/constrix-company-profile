import { workspaceApi } from "@/lib/axios/instances/workspace";
import { BE_ListParams } from "@/types/api/common/args/list";
import {
  CreateServiceCategoryArgs,
  UpdateServiceCategoryArgs,
} from "./types/args";
import {
  ListServiceCategoriesResponse,
  ShowServiceCategoryResponse,
  CreateServiceCategoryResponse,
} from "./types/responses";

export const ServiceCategoryApi = {
  list: (params?: BE_ListParams) =>
    workspaceApi.get<ListServiceCategoriesResponse>(
      "services/categories/list",
      {
        params,
      }
    ),

  show: (id: string) =>
    workspaceApi.get<ShowServiceCategoryResponse>(`services/categories/${id}`),

  create: (args: CreateServiceCategoryArgs) =>
    workspaceApi.post<CreateServiceCategoryResponse>(
      "services/categories",
      args
    ),

  update: (id: string, args: UpdateServiceCategoryArgs) =>
    workspaceApi.put<CreateServiceCategoryResponse>(
      `services/categories/${id}`,
      args
    ),

  delete: (id: string) => workspaceApi.delete(`services/categories/${id}`),

  count: () => workspaceApi.get<number>("services/categories/count"),

  findByCode: (code: string) =>
    workspaceApi.get<ShowServiceCategoryResponse>(
      `services/categories/code/${code}`
    ),
};
