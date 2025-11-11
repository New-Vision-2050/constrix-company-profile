import { _m, MessagesGroup } from "../../types";
import { workspaceFormMessages } from "./form";
import { singleWorkspaceMessages } from "./single-workspace";

export const workspaceMessages = new MessagesGroup({
  title: _m("Workspace", "مساحة العمل"),
  details: _m("Workspace Details", "تفاصيل مساحة العمل"),
  pluralTitle: _m("Workspaces", "مساحات العمل"),
  add: _m("Add Workspace", "إضافة مساحة عمل"),
  searchPlaceholder: _m("Search workspaces...", "البحث في مساحات العمل..."),
  overview: _m("Overview", "نظرة عامة"),
  settings: _m("Settings", "الإعدادات"),
  crew: _m("crew", "الطاقم"),
  branches: _m("Branches", "الفروع"),
  form: workspaceFormMessages,
});

export { singleWorkspaceMessages };
