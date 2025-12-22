import { BE_SocialLink } from "@/types/api/base/social-link";
import { BE_PaginatedResponse } from "@/types/api/common/pagination";

export interface ListSocialLinksResponse extends BE_PaginatedResponse<BE_SocialLink[]> {}

