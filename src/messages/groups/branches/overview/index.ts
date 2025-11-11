import { _m, MessagesGroup } from "../../../types";

export const branchOverviewMessages = new MessagesGroup({
  address: _m("Address", "العنوان"),
  location: _m("Location", "الموقع"),
  phone: _m("Phone", "الهاتف"),
  email: _m("Email", "البريد الإلكتروني"),
  createdAt: _m("Created At", "تاريخ الإنشاء"),
  workingHours: _m("Working Hours", "ساعات العمل"),
  closed: _m("Closed", "مغلق"),
  noWorkingHours: _m("No working hours set", "لم يتم تحديد ساعات العمل"),
  nextDay: _m("Next Day", "اليوم التالي"),
});
