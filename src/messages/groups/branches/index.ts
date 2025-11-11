import { _m, MessagesGroup } from "../../types";
import { branchFormMessages } from "./form";
import { branchOverviewMessages } from "./overview";

export const branchMessages = new MessagesGroup({
  title: _m("Branch", "الفرع"),
  details: _m("Branch Details", "تفاصيل الفرع"),
  pluralTitle: _m("Branches", "الفروع"),
  add: _m("Add Branch", "إضافة فرع"),
  edit: _m("Edit Branch", "تعديل الفرع"),
  searchPlaceholder: _m("Search branches...", "البحث في الفروع..."),
  noBranches: _m("No branches available.", "لا توجد فروع متاحة."),
  overview: _m("Overview", "نظرة عامة"),
  settings: _m("Settings", "الإعدادات"),
  branches: _m("Branches", "الفروع"),
  form: branchFormMessages,
  overviewDetails: branchOverviewMessages,
});
