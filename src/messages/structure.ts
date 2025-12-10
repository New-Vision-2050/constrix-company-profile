import { MessagesGroup } from "./types";
import { commonMessages } from "./groups/common";
import { navigationMessages, publicNavMessages } from "./groups/navigation";
import { contactInfoMessages, contactMessages } from "./groups/contact";
import { footerMessages } from "./groups/footer";
import { servicesPageMessages } from "./groups/pages/services";
import { homeMessages } from "./groups/home";
import { newsPageMessages } from "./groups/pages/news";
import { newsDetailsPageMessages } from "./groups/pages/news-details";
import { aboutMessages } from "./groups/about";

// Main messages structure combining all groups
export const messagesStructure = new MessagesGroup({
  common: commonMessages,
  navigation: navigationMessages,
  nav: publicNavMessages,
  home: homeMessages,
  about: aboutMessages,
  footer: footerMessages,
  services: new MessagesGroup({}),
  serviceCategories: new MessagesGroup({}),
  contactForm: contactMessages,
  contactInfo: contactInfoMessages,
  pages: new MessagesGroup({
    services: servicesPageMessages,
    news: newsPageMessages,
    newsDetails: newsDetailsPageMessages,
  }),
});
