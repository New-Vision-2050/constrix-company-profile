import { BE_Patient } from "@/types/api/base/patient";
import {
  CreateGlobalPatientArgs,
  CreateLocalPatientArgs,
  SearchGlobalPatientsArgs,
} from "./types/args";
import { SearchGlobalPatientsResponse } from "./types/responses";
import { workspaceApi } from "@/lib/axios/instances/workspace";
import { BE_LocalPatient } from "@/types/api/base/patient/local";

export const PatientApi = {
  global: {
    create: (args: CreateGlobalPatientArgs) =>
      workspaceApi.post<BE_Patient>("patient/global", args),
    search: (args: SearchGlobalPatientsArgs) =>
      workspaceApi.get<SearchGlobalPatientsResponse>("patient/search", {
        params: args,
      }),
    show: (globalPatientId: string) =>
      workspaceApi.get<BE_Patient>(`patient/global/${globalPatientId}`),
  },

  local: {
    show: (globalPatientId: string) =>
      workspaceApi.get<BE_LocalPatient>(`patient/local/${globalPatientId}`),
    create: (args: CreateLocalPatientArgs) =>
      workspaceApi.post<CreateGlobalPatientArgs>("patient/local", args),
    update: (globalPatientId: string, args: CreateLocalPatientArgs) =>
      workspaceApi.put<CreateGlobalPatientArgs>(
        `patient/local/${globalPatientId}`,
        args
      ),
  },
};
