import { MessagesGroup, _m } from "../../types";

export const contactMessages = new MessagesGroup({
  name: _m("Name", "الاسم كامل"),
  phone: _m("Phone", "رقم الجوال"),
  email: _m("Email", "البريد الالكتروني"),
  subject: _m("Subject", "العنوان"),
  message: _m("Message", "الرسالة"),
  submit: _m("Contact Us", "تواصل معنا"),
  errors: new MessagesGroup({
    name: _m(
      "Name is required (at least 3 characters)",
      "الاسم مطلوب (3 أحرف على الأقل)"
    ),
    phone: _m("Invalid phone number", "رقم الجوال غير صالح"),
    email: _m("Invalid email address", "البريد الإلكتروني غير صالح"),
    subject: _m("Invalid subject", "العنوان غير صالح"),
    message: _m(
      "Write a longer message (at least 10 characters)",
      "اكتب رسالة أطول (10 أحرف على الأقل)"
    ),
  }),
});

export const contactInfoMessages = new MessagesGroup({
  title: _m("Contact Information", "مواقع التواصل الاجتماعي"),
  email: _m("Email", "البريد الإلكتروني"),
  addresses: _m("Our Addresses", "عناويننا"),
  locations: new MessagesGroup({
    jeddah: _m(
      "Jeddah - Al Rawdah - Al Safa Street",
      "جدة - حي الروضة - شارع الصفا"
    ),
    cairo: _m(
      "Cairo - Nasr City - 26 Mohamed Al-Moqren Street",
      "القاهرة - مدينة نصر - 26 شارع محمد المقرن"
    ),
    makkah: _m(
      "Makkah - Third Ring Road",
      "مكة المكرمة - الطريق الدائري الثالث"
    ),
  }),
});
