import { _m, MessagesGroup } from "../../types";

export const aboutPageMessages = new MessagesGroup({
  title: _m("About Us", "نبذة عنا"),
  description: _m("This is the administrator's go-to tool for accessing all settings, configurations, and customizations. Use it to add users, manage nicknames for group accounts, set policies to monitor business email content, and much more.", "الذي يلجأ إليه المسؤول للوصول إلى كل الإعدادات وعمليات التكوين والتخصيص. اعمد إلى إضافة المستخدمين وإدارة الأسماء المستعارة لحسابات المجموعات وإعداد السياسات للإشراف على محتوى البريد الإلكتروني الخاص بالأعمال والكثير غير ذلك."),
  whoWeAre: new MessagesGroup({
    title: _m("Who We Are", "من نحن"),
    description: _m("This is the administrator's go-to tool for accessing all settings, configurations, and customizations. Use it to add users, manage nicknames for group accounts, set policies to monitor business email content, and much more.", "الذي يلجأ إليه المسؤول للوصول إلى كل الإعدادات وعمليات التكوين والتخصيص. اعمد إلى إضافة المستخدمين وإدارة الأسماء المستعارة لحسابات المجموعات وإعداد السياسات للإشراف على محتوى البريد الإلكتروني الخاص بالأعمال والكثير غير ذلك."),
    // Users List Section
    "users-list-title": _m("Students by average mark", "الطلاب حسب متوسط العلامات"),
    "sort-ascending": _m("Ascending", "تصاعدي"),
    "sort-descending": _m("Descending", "تنازلي"),

    // Performance Card Section
    "performance-title": _m("Type of studying", "نوع الدراسة"),
    "students": _m("students", "طلاب"),
    "sessions": _m("sessions", "جلسات"),
  }),
  partners: new MessagesGroup({
    title: _m("Partners", "الشركاء"),
  })
});
