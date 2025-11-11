import { Nullable } from "@/types/common/nullable";

export interface BE_UserModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  hash: string;
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  roleId: Nullable<string>;
  profileImage: Nullable<string>;
  otp: Nullable<string>;
  emailVerifiedAt: Nullable<string>;
}
export interface BE_User extends BE_UserModel {}
