import { MessagesGroup } from "./types";
import { commonMessages } from "./groups/common";
import { navigationMessages, publicNavMessages } from "./groups/navigation";
import { authMessages } from "./groups/auth";
import {
  workspaceMessages,
  singleWorkspaceMessages,
} from "./groups/workspaces";
import { branchMessages } from "./groups/branches";
import {
  productsMessages,
  blogsMessages,
  formMessages,
  homePageMessages,
} from "./groups/pages";
import { patientMessages } from "./groups/patient";

// Main messages structure combining all groups
export const messagesStructure = new MessagesGroup({
  HomePage: homePageMessages,
  common: commonMessages,
  navigation: navigationMessages,
  nav: publicNavMessages,
  products: productsMessages,
  workspaces: workspaceMessages,
  workspace: singleWorkspaceMessages,
  branches: branchMessages,
  blogs: blogsMessages,
  auth: authMessages,
  form: formMessages,
  patient: patientMessages,
  services: new MessagesGroup({}),
  serviceCategories: new MessagesGroup({}),
});
