import { baseApi } from "@/lib/axios/instances/base";
import {
  ListServicesResponse,
  OurServicesPageResponse,
  ShowServiceResponse,
} from "./response";

export interface ServicesFilters {
  page?: number;
  per_page?: number;
  name?: string;
  status?: 0 | 1;
  category_website_cms_id?: string;
}

export const ServicesApi = {
  ourServicesPage: () =>
    baseApi.get<OurServicesPageResponse>("/website-our-services/current"),
  list: (params?: ServicesFilters) =>
    baseApi.get<ListServicesResponse>("/website-services", {
      params,
    }),
  show: (id: string) =>
    baseApi.get<ShowServiceResponse>(`/website-services/${id}`),
};
