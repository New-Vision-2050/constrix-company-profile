export interface CreateGlobalPatientArgs {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  mobilePhone: string;
  landlinePhone: string;
  email: string;
  country: string;
  city: string;
  street: string;
  building: string;
  floor: string;
  apartment: string;
  fullAddress: string;
  allergies: string;
  notes: string;
  identificationNumber: string;
}

export interface UpdateGlobalPatientArgs
  extends Partial<CreateGlobalPatientArgs> {}

export interface CreateLocalPatientArgs {
  globalPatientId: string;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  age?: number | null;
  mobilePhone?: string | null;
  landlinePhone?: string | null;
  email?: string | null;
  country?: string | null;
  city?: string | null;
  street?: string | null;
  building?: string | null;
  floor?: string | null;
  apartment?: string | null;
  fullAddress?: string | null;
  allergies?: string | null;
  notes?: string | null;
  identificationNumber?: string | null;
}

export interface UpdateLocalPatientArgs
  extends Partial<CreateLocalPatientArgs> {}

export interface SearchGlobalPatientsArgs {
  query: string;
  page?: number;
  limit?: number;
}
