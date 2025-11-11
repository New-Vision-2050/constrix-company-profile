import { LoginArgs, ForgotPasswordArgs, ResetPasswordArgs } from "./types/args";
import { baseApi, baseApiNoAuth } from "@/lib/axios/instances/base";
import {
  LoginResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from "./types/responses";

export const AuthApi = {
  login: (args: LoginArgs) =>
    baseApiNoAuth.post<LoginResponse>("auth/login", args),
  verifyEmail: (token: string) =>
    baseApiNoAuth.get(`auth/verify-email`, { params: { token } }),
  resendVerificationEmail: () => baseApi.post("auth/resend-verification"),
  forgotPassword: (args: ForgotPasswordArgs) =>
    baseApiNoAuth.post<ForgotPasswordResponse>("auth/forgot-password", args),
  resetPassword: (args: ResetPasswordArgs) =>
    baseApiNoAuth.post<ResetPasswordResponse>("auth/reset-password", args),
};
