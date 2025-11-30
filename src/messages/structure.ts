import { MessagesGroup } from "./types";
import { commonMessages } from "./groups/common";
import { navigationMessages, publicNavMessages } from "./groups/navigation";
import { footerMessages } from "./groups/footer";
import { servicesPageMessages } from "./groups/pages/services";

// Main messages structure combining all groups
export const messagesStructure = new MessagesGroup({
  common: commonMessages,
  navigation: navigationMessages,
  nav: publicNavMessages,
  footer: footerMessages,
  services: new MessagesGroup({}),
  serviceCategories: new MessagesGroup({}),
  pages: new MessagesGroup({
    services: servicesPageMessages,
  }),
});
