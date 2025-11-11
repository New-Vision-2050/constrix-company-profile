import { BE_Patient } from "@/types/api/base/patient";

export const getPatientName = (patient: BE_Patient): string => {
  return [patient.firstName, patient.middleName, patient.lastName]
    .filter(Boolean)
    .join(" ");
};
