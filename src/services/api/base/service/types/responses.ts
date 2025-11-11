import { BE_Service, BE_ServiceWithCategory } from "@/types/api/base/service";
import { BE_Pagination } from "@/types/api/common/pagination";

export type ListServicesResponse = BE_Pagination<BE_ServiceWithCategory[]>;
export type ShowServiceResponse = BE_ServiceWithCategory;
export interface CreateServiceResponse extends BE_Service {}
