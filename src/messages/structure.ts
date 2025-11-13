import { MessagesGroup } from "./types";
import { commonMessages } from "./groups/common";
import { navigationMessages, publicNavMessages } from "./groups/navigation";
import { contactInfoMessages, contactMessages } from "./groups/contact";

// Main messages structure combining all groups
export const messagesStructure = new MessagesGroup({
  common: commonMessages,
  navigation: navigationMessages,
  nav: publicNavMessages,
  services: new MessagesGroup({}),
  serviceCategories: new MessagesGroup({}),
  contactForm: contactMessages,
  contactInfo: contactInfoMessages,
});
