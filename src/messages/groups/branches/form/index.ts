import { _m, MessagesGroup } from "../../../types";

export const branchFormMessages = new MessagesGroup({
  name: _m("Branch Name", "اسم الفرع"),
  slug: _m("Slug", "المعرف"),
  address: _m("Address", "العنوان"),
  city: _m("City", "المدينة"),
  country: _m("Country", "الدولة"),
  phone: _m("Phone", "الهاتف"),
  email: _m("Email", "البريد الإلكتروني"),
  logoUrl: _m("Logo URL", "رابط الشعار"),
  workingHours: _m("Working Hours", "ساعات العمل"),
});
