import { _m, MessagesGroup } from "../../types";

export const navigationMessages = new MessagesGroup({
  dashboard: _m("Dashboard", "لوحة التحكم"),
  products: _m("Products", "المنتجات"),
  users: _m("Users", "المستخدمين"),
  blog: _m("Blog", "المدونة"),
  account: _m("Account", "الحساب"),
  settings: _m("Settings", "الإعدادات"),
  logout: _m("Logout", "تسجيل الخروج"),
  language: _m("Language", "اللغة"),
  notifications: _m("Notifications", "الإشعارات"),
});

// Public website navigation
export const publicNavMessages = new MessagesGroup({
  home: _m("Home", "الرئيسية"),
  services: _m("Our Services", "خدماتنا"),
  news: _m("Our News", "أخبارنا"),
  about: _m("About Us", "من نحن"),
  contact: _m("Contact Us", "تواصل معنا"),
  subscribe: _m("Subscribe Now", "اشترك الآن"),
});