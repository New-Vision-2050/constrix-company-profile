import { MessagesGroup } from "./types";
import { commonMessages } from "./groups/common";
import { navigationMessages, publicNavMessages } from "./groups/navigation";
import { contactInfoMessages, contactMessages } from "./groups/contact";
import { footerMessages } from "./groups/footer";
import { servicesPageMessages } from "./groups/pages/services";
import { homeMessages } from "./groups/home";
import { newsPageMessages } from "./groups/pages/news";
import { newsDetailsPageMessages } from "./groups/pages/news-details";
import { serviceDetailsPageMessages } from "./groups/pages/service-details";
import { aboutMessages } from "./groups/about";
import { newsV2Messages } from "./groups/news-v2";
import { errorPageMessages } from "./groups/pages/error";
import { projectsPageMessages } from "./groups/pages/projects";

// Main messages structure combining all groups
export const messagesStructure = new MessagesGroup({
  common: commonMessages,
  navigation: navigationMessages,
  nav: publicNavMessages,
  home: homeMessages,
  about: aboutMessages,
  newsV2: newsV2Messages,
  footer: footerMessages,
  services: new MessagesGroup({}),
  serviceCategories: new MessagesGroup({}),
  contactForm: contactMessages,
  contactInfo: contactInfoMessages,
  pages: new MessagesGroup({
    error: errorPageMessages,
    services: servicesPageMessages,
    news: newsPageMessages,
    newsDetails: newsDetailsPageMessages,
    projects: projectsPageMessages,
    serviceDetails: serviceDetailsPageMessages,
  }),
});
