import { _m, MessagesGroup } from "../../../types";

export const workspaceFormMessages = new MessagesGroup({
  name: _m("Workspace Name", "اسم مساحة العمل"),
  description: _m("Description", "الوصف"),
  nameRequired: _m("Workspace name is required", "اسم مساحة العمل مطلوب"),
});
