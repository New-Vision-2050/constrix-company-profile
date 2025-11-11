import { _m, MessagesGroup } from "../../../types";

export const validationMessages = new MessagesGroup({
  emailRequired: _m(
    "Email must be a valid email address",
    "يجب أن يكون البريد الإلكتروني عنوان بريد إلكتروني صالح"
  ),
  passwordMinLength: _m(
    "Password must be at least 4 characters",
    "يجب أن تكون كلمة المرور 4 أحرف على الأقل"
  ),
  passwordsMatch: _m("Passwords must match", "يجب أن تتطابق كلمات المرور"),
  firstNameRequired: _m("First name is required", "الاسم الأول مطلوب"),
  lastNameRequired: _m("Last name is required", "اسم العائلة مطلوب"),
});
