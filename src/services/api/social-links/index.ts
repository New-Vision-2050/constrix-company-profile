import { baseApi } from "@/lib/axios/instances/base";
import { ListSocialLinksResponse } from "./response";

export interface SocialLinksFilters {
  page?: number;
  per_page?: number;
}

export const SocialLinksApi = {
  list: (filters?: SocialLinksFilters) =>
    baseApi.get<ListSocialLinksResponse>("/social-media-links", { params: filters }),
};

