import { _m, MessagesGroup } from "../../types";

export const homeMessages = new MessagesGroup({
  more: _m("More", "المزيد"),
  tagline: _m("ENGINEERING & PROJECT MANAGEMENT", "الهندسة وإدارة المشاريع"),
  partners: _m("Partners", "الشركاء"),
  servicesTitle: _m("Our Services", "ابرز خدماتنا"),
  services: new MessagesGroup({
    service1: new MessagesGroup({
      title: _m("Supervision of Execution", "الاشراف على التنفيذ"),
      description: _m(
        "The official resorts to access all settings and configuration operations and customization. Proceed to add users and manage aliases for group accounts and set policies for supervising email content for business and much more.",
        "الذي يلجأ إليه المسؤول للوصول إلى كل الإعدادات وعمليات التكوين والتخصيص. اعمد إلى إضافة المستخدمين وإدارة الأسماء المستعارة لحسابات المجموعات وإعداد السياسات للإشراف على محتوى البريد الإلكتروني الخاص بالأعمال والكثير غير ذلك."
      ),
    }),
    service2: new MessagesGroup({
      title: _m("Supervision of Execution", "الاشراف على التنفيذ"),
      description: _m(
        "The official resorts to access all settings and configuration operations and customization. Proceed to add users and manage aliases for group accounts and set policies for supervising email content for business and much more.",
        "الذي يلجأ إليه المسؤول للوصول إلى كل الإعدادات وعمليات التكوين والتخصيص. اعمد إلى إضافة المستخدمين وإدارة الأسماء المستعارة لحسابات المجموعات وإعداد السياسات للإشراف على محتوى البريد الإلكتروني الخاص بالأعمال والكثير غير ذلك."
      ),
    }),
    service3: new MessagesGroup({
      title: _m("Supervision of Execution", "الاشراف على التنفيذ"),
      description: _m(
        "The official resorts to access all settings and configuration and customization. Proceed to add users and manage aliases for group accounts and set policies for email content for business and much more.",
        "الذي يلجأ إليه المسؤول للوصول إلى كل الإعدادات التكوين والتخصيص. اعمد إلى إضافة المستخدمين وإدارة الأسماء المستعارة لحسابات المجموعات وإعداد السياسات محتوى البريد الإلكتروني الخاص بالأعمال والكثير"
      ),
    }),
  }),
  downloadCompanyFile: _m("Download Company File", "تحميل ملف الشركة"),
  companyProfileFile: _m("Company Profile File", "ملف الشركة التعريفي"),
});
