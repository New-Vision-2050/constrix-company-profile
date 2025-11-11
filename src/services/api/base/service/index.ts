import { workspaceApi } from "@/lib/axios/instances/workspace";
import { BE_ListParams } from "@/types/api/common/args/list";
import { CreateServiceArgs, UpdateServiceArgs } from "./types/args";
import {
  ListServicesResponse,
  ShowServiceResponse,
  CreateServiceResponse,
} from "./types/responses";

export interface ListServicesParams extends BE_ListParams {
  categoryId?: string;
}

export const ServiceApi = {
  list: (params?: ListServicesParams) =>
    workspaceApi.get<ListServicesResponse>("services", { params }),

  show: (id: string) => workspaceApi.get<ShowServiceResponse>(`services/${id}`),

  create: (args: CreateServiceArgs) =>
    workspaceApi.post<CreateServiceResponse>("services", args),

  update: (id: string, args: UpdateServiceArgs) =>
    workspaceApi.put<CreateServiceResponse>(`services/${id}`, args),

  delete: (id: string) => workspaceApi.delete(`services/${id}`),

  count: () => workspaceApi.get<number>("services/count"),

  findByCode: (code: string) =>
    workspaceApi.get<ShowServiceResponse>(`services/code/${code}`),

  findByCategory: (categoryId: string, params?: BE_ListParams) =>
    workspaceApi.get<ListServicesResponse>(`services/category/${categoryId}`, {
      params,
    }),
};
