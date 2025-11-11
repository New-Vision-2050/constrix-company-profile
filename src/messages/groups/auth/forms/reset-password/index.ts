import { _m, MessagesGroup } from "../../../../types";

export const resetPasswordMessages = new MessagesGroup({
  title: _m("Reset password", "إعادة تعيين كلمة المرور"),
  subtitle: _m(
    "Please enter your new password",
    "الرجاء إدخال كلمة المرور الجديدة"
  ),
  password: _m("New Password", "كلمة المرور الجديدة"),
  confirmPassword: _m("Confirm New Password", "تأكيد كلمة المرور الجديدة"),
  resetPassword: _m("Update Password", "تحديث كلمة المرور"),
  backToLogin: _m("Return to sign in", "العودة إلى تسجيل الدخول"),
  successMessage: _m(
    "Password reset successful",
    "تم إعادة تعيين كلمة المرور بنجاح"
  ),
  invalidToken: _m(
    "Invalid or expired reset token",
    "رمز إعادة التعيين غير صالح أو منتهي الصلاحية"
  ),
});
