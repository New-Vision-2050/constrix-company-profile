import { baseApi } from "@/lib/axios/instances/base";
import { ListProjectsResponse, ShowProjectItemResponse } from "./response";

export interface ProjectsFilters {
  page?: number;
  per_page?: number;
  title?: string;
  name?: string;
  status?: 0 | 1;
  website_project_setting_id?: string;
}

export const ProjectsApi = {
  list: (filters?: ProjectsFilters) =>
    baseApi.get<ListProjectsResponse>("/website-projects", { params: filters }),
  show: (id: string) => baseApi.get<ShowProjectItemResponse>(`website-projects/${id}`),
};
