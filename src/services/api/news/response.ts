import { BE_NewsItem } from "@/types/api/base/news";
import { BE_BaseResponse } from "@/types/api/common/base-response";
import { BE_PaginatedResponse } from "@/types/api/common/pagination";

export interface ListNewsResponse extends BE_PaginatedResponse<BE_NewsItem[]> {}
export interface ShowNewsItemResponse extends BE_BaseResponse<BE_NewsItem> {}
