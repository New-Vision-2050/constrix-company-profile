import { Nullable } from "@/types/common/nullable";
import { BE_User } from "../user";

export interface BE_LocalPatient {
  id: string;
  createdAt: string;
  globalPatientId: string;
  workspaceId: string;
  updatedAt: Nullable<string>;
  firstName: Nullable<string>;
  middleName: Nullable<string>;
  lastName: Nullable<string>;
  gender: Nullable<string>;
  dateOfBirth: Nullable<string>;
  age: number;
  mobilePhone: Nullable<string>;
  landlinePhone: Nullable<string>;
  email: Nullable<string>;
  country: Nullable<string>;
  city: Nullable<string>;
  street: Nullable<string>;
  building: Nullable<string>;
  floor: Nullable<string>;
  apartment: Nullable<string>;
  fullAddress: Nullable<string>;
  allergies: Nullable<string>;
  notes: Nullable<string>;
  createdByUserId: string;
  createdBy: Pick<
    BE_User,
    | "id"
    | "firstName"
    | "lastName"
    | "email"
    | "profileImage"
    | "roleId"
    | "createdAt"
    | "updatedAt"
  >;
}
