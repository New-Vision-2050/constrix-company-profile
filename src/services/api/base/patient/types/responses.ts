import { BE_Patient } from "@/types/api/base/patient";
import { BE_LocalPatient } from "@/types/api/base/patient/local";
import { BE_Pagination } from "@/types/api/common/pagination";

export interface SearchGlobalPatientsResponse {
  patients: BE_Patient[];
  total: number;
}

export interface ListWorkspacePatients
  extends BE_Pagination<BE_LocalPatient[]> {}

export interface GetPatientResponse extends BE_Patient {}

export interface CreatePatientResponse extends BE_Patient {}

export interface UpdatePatientResponse extends BE_Patient {}
