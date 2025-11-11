import { _m, MessagesGroup } from "../../../../types";

export const registerMessages = new MessagesGroup({
  title: _m("Register", "سجل"),
  firstName: _m("First Name", "الاسم الأول"),
  lastName: _m("Last Name", "اسم العائلة"),
  email: _m("Email address", "البريد الإلكتروني"),
  password: _m("Password", "كلمة المرور"),
  register: _m("Register", "سجل"),
  alreadyHaveAccount: _m("Already have an account?", "هل لديك حساب بالفعل؟"),
  loginInstead: _m("Login instead", "تسجيل الدخول بدلاً من ذلك"),
  or: _m("OR", "أو"),
});
