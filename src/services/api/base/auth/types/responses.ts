import { BE_User } from "@/types/api/base/user";

export interface LoginResponse {
  user: BE_User;
  token: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}
