import { BE_WebsiteService } from "@/types/api/base/services";
import { BE_BaseResponse } from "@/types/api/common/base-response";
import { BE_PaginatedResponse } from "@/types/api/common/pagination";

export interface ListServicesResponse
  extends BE_PaginatedResponse<BE_WebsiteService[]> { }

export interface ShowServiceResponse
  extends BE_BaseResponse<BE_WebsiteService> { }


