import { _m, MessagesGroup } from "../../../../types";

export const forgotPasswordMessages = new MessagesGroup({
  title: _m("Forgot your password?", "نسيت كلمة المرور؟"),
  subtitle: _m(
    "Please enter the email address associated with your account and We will email you a link to reset your password.",
    "الرجاء إدخال عنوان البريد الإلكتروني المرتبط بحسابك وسنرسل لك رابطاً لإعادة تعيين كلمة المرور."
  ),
  email: _m("Email address", "البريد الإلكتروني"),
  sendResetLink: _m("Send Reset Link", "إرسال رابط إعادة التعيين"),
  backToLogin: _m("Return to sign in", "العودة إلى تسجيل الدخول"),
  successMessage: _m(
    "Password reset email sent successfully",
    "تم إرسال بريد إعادة تعيين كلمة المرور بنجاح"
  ),
});
