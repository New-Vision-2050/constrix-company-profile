import { _m, MessagesGroup } from "../../../../types";

export const singleWorkspaceOverviewMessages = new MessagesGroup({
  adminTitle: _m("Admin", "المسؤول"),
  membersCount: _m("Members", "الأعضاء"),
  membersSubtitle: _m("{count} members", "{count} أعضاء"),
  createdAt: _m("Created at", "تاريخ الإنشاء"),
  createdAtValue: _m("{date}", "{date}"),
  currentPackage: _m("Current package", "الباقة الحالية"),
  currentPackageValue: _m("{package}", "{package}"),
  expiryDate: _m("Expiry date", "تاريخ الانتهاء"),
  expiryDateValue: _m("{date}", "{date}"),
  status: _m("Status", "الحالة"),
  statusActive: _m("Active", "نشط"),
});
