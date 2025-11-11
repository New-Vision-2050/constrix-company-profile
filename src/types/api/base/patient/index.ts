import { Nullable } from "@/types/common/nullable";
import { BE_LocalPatient } from "./local";

export interface BE_Patient {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  middleName: Nullable<string>;
  lastName: string;
  gender: Nullable<string>;
  dateOfBirth: Nullable<string>;
  age: Nullable<number>;
  identificationType: Nullable<string>;
  identificationNumber?: Nullable<string>;
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
  local?: BE_LocalPatient;
}
