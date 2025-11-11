import { MessagesGroup } from "../../../types";
import { singleWorkspaceOverviewMessages } from "./overview";

export const singleWorkspaceMessages = new MessagesGroup({
  overview: singleWorkspaceOverviewMessages,
});
