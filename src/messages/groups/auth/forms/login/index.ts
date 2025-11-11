import { _m, MessagesGroup } from "../../../../types";

export const loginMessages = new MessagesGroup({
  title: _m("Sign in", "تسجيل الدخول"),
  email: _m("Email address", "البريد الإلكتروني"),
  password: _m("Password", "كلمة المرور"),
  forgotPassword: _m("Forgot password?", "نسيت كلمة المرور؟"),
  signIn: _m("Sign in", "تسجيل الدخول"),
  dontHaveAccount: _m("Don't have an account?", "ليس لديك حساب؟"),
  getStarted: _m("Get started", "ابدأ الآن"),
  or: _m("OR", "أو"),
});
