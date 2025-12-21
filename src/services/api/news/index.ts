import { baseApi } from "@/lib/axios/instances/base";
import { ListNewsResponse, ShowNewsItemResponse } from "./response";

export interface NewsFilters {
  page?: number;
  per_page?: number;
  title?: string;
  content?: string;
  category_website_cms_id?: string;
  publish_date?: string;
  status?: 0 | 1;
  search?: string;
}

export const NewsApi = {
  list: (filters?: NewsFilters) =>
    baseApi.get<ListNewsResponse>("/website-news", { params: filters }),
  show: (id: string) => baseApi.get<ShowNewsItemResponse>(`website-news/${id}`),
};
