import { BE_FeaturedProject } from "@/types/api/base/project";
import { BE_BaseResponse } from "@/types/api/common/base-response";
import { BE_PaginatedResponse } from "@/types/api/common/pagination";

export interface ListProjectsResponse extends BE_PaginatedResponse<BE_FeaturedProject[]> {}
export interface ShowProjectItemResponse extends BE_BaseResponse<BE_FeaturedProject> {}
