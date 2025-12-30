import { BE_PaginatedResponse } from "@/types/api/common/pagination";
import { BE_Address } from "@/types/api/base/address";

export interface ListAddressesResponse
  extends BE_PaginatedResponse<BE_Address[]> {}
