export interface LoginArgs {
  email: string;
  password: string;
}

export interface ForgotPasswordArgs {
  email: string;
}

export interface ResetPasswordArgs {
  token: string;
  password: string;
}
