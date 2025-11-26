import { MessagesGroup } from "./types";
import { commonMessages } from "./groups/common";
import { navigationMessages, publicNavMessages } from "./groups/navigation";
import { servicesPageMessages } from "./groups/pages/services";
import { aboutPageMessages } from "./groups/pages/about";

// Main messages structure combining all groups
export const messagesStructure = new MessagesGroup({
  common: commonMessages,
  navigation: navigationMessages,
  nav: publicNavMessages,
  services: new MessagesGroup({}),
  serviceCategories: new MessagesGroup({}),
  pages: new MessagesGroup({
    services: servicesPageMessages,
    about: aboutPageMessages,
  }),
});
