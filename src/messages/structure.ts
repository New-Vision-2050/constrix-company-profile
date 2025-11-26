import { MessagesGroup } from "./types";
import { commonMessages } from "./groups/common";
import { navigationMessages, publicNavMessages } from "./groups/navigation";
import { servicesPageMessages } from "./groups/pages/services";
import { newsPageMessages } from "./groups/pages/news";
import { newsDetailsPageMessages } from "./groups/pages/news-details";

// Main messages structure combining all groups
export const messagesStructure = new MessagesGroup({
  common: commonMessages,
  navigation: navigationMessages,
  nav: publicNavMessages,
  services: new MessagesGroup({}),
  serviceCategories: new MessagesGroup({}),
  pages: new MessagesGroup({
    services: servicesPageMessages,
    news: newsPageMessages,
    newsDetails: newsDetailsPageMessages,
  }),
});
