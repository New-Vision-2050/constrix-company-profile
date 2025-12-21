import { MessagesGroup, _m } from "../../types";

export const contactMessages = new MessagesGroup({
  name: _m("Full Name", "الاسم كامل"),
  phone: _m("Mobile Number", "رقم الجوال"),
  email: _m("Email", "البريد الالكتروني"),
  address: _m("Address", "العنوان"),
  message: _m("Message", "الرسالة"),
  submit: _m("Contact Us", "تواصل معنا"),
  placeholders: new MessagesGroup({
    name: _m("Enter full name", "ادخل الاسم كامل"),
    phone: _m("Enter mobile number", "ادخل رقم الجوال"),
    email: _m("Enter email", "ادخل البريد الالكتروني"),
    address: _m("Enter address", "ادخل العنوان"),
    message: _m("Enter message", "ادخل الرسالة"),
  }),
  errors: new MessagesGroup({
    name: _m(
      "Name is required (at least 3 characters)",
      "الاسم مطلوب (3 أحرف على الأقل)"
    ),
    phone: _m("Invalid phone number", "رقم الجوال غير صالح"),
    email: _m("Invalid email address", "البريد الإلكتروني غير صالح"),
    address: _m("Address is required", "العنوان مطلوب"),
    message: _m(
      "Write a longer message (at least 10 characters)",
      "اكتب رسالة أطول (10 أحرف على الأقل)"
    ),
  }),
  success: _m(
    "Message sent successfully! We'll get back to you soon.",
    "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً."
  ),
  error: _m(
    "Failed to send message. Please try again.",
    "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى."
  ),
  successMessage: new MessagesGroup({
    title: _m("Message Received Successfully!", "تم استلام رسالتك بنجاح!"),
    description: _m(
      "Thank you for contacting us. We have received your message successfully and will get back to you as soon as possible.",
      "شكراً لتواصلك معنا. لقد استلمنا رسالتك بنجاح وسنتواصل معك في أقرب وقت ممكن."
    ),
    newMessageButton: _m("Send Another Message", "إرسال رسالة أخرى"),
  }),
});

export const contactInfoMessages = new MessagesGroup({
  title: _m("Social Media", "مواقع التواصل الاجتماعي"),
  email: _m("Email", "البريد الالكتروني"),
  addresses: _m("Our Addresses", "عناويننا"),
  locations: new MessagesGroup({
    jeddah: _m(
      "Jeddah - Al Nahda District - Al Safa Street",
      "جدة - حي النهضة - شارع الصفا"
    ),
    cairo: _m(
      "Cairo - Nasr City - 26 Mohamed Al-Maqreefy Street",
      "القاهرة - مدينة نصر - 26 شارع محمد المقريفي"
    ),
    makkah: _m(
      "Mecca - 24232 - Third Ring Road, Al Khalidiyah",
      "مكة المكرمة -24232 - الطريق الدائري الثالث، الخالدية"
    ),
    riyadh: _m(
      "Riyadh 13313 - Ring Road, Al Wadi",
      "الرياض 13313 - الطريق الدائري، الوادي"
    ),
  }),
});
