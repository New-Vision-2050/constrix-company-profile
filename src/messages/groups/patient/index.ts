import { _m, MessagesGroup } from "../../types";
import { patientFormMessages } from "./form";

export const patientMessages = new MessagesGroup({
  title: _m("Patient", "المنتفع"),
  plural: _m("Patients", "المنتفعين"),
  searchPatients: _m("Search Patients", "بحث عن منتفعين"),
  add: _m("Add Patient", "اضافة منتفع"),
  update: _m("Update Patient", "تعديل البيانات"),
  local: _m("Local", "محلي"),
  viewDetails: _m("View Details", "عرض التفاصيل"),
  years: _m("years", "سنة/سنوات"),
  searchPlaceholder: _m(
    "Search by name, phone, ID number",
    "ابحث بالاسم، رقم الهاتف، رقم الهوية"
  ),
  profile: _m("Patient Profile", "ملف المنتفع"),
  overview: _m("Overview", "نظرة عامة"),
  medicalHistory: _m("Medical History", "السجل الطبي"),
  appointments: _m("Appointments", "المواعيد"),
  documents: _m("Documents", "المستندات"),
  settings: _m("Settings", "الإعدادات"),
  about: _m("About", "حول"),
  personalInformation: _m("Personal Information", "المعلومات الشخصية"),
  contactInformation: _m("Contact Information", "معلومات الاتصال"),
  medicalInformation: _m("Medical Information", "المعلومات الطبية"),
  noDataAvailable: _m("No data available", "لا توجد بيانات متاحة"),
  form: patientFormMessages,
  overviewTab: new MessagesGroup({
    patientSince: _m("Patient Since", "منتفع منذ"),
    lastVisit: _m("Last Visit", "آخر زيارة"),
    totalVisits: _m("Total Visits", "إجمالي الزيارات"),
    upcomingAppointments: _m("Upcoming Appointments", "المواعيد القادمة"),
    bloodType: _m("Blood Type", "فصيلة الدم"),
    weight: _m("Weight", "الوزن"),
    height: _m("Height", "الطول"),
    chronicDiseases: _m("Chronic Diseases", "الأمراض المزمنة"),
    kg: _m("kg", "كجم"),
    cm: _m("cm", "سم"),
    visitsCount: _m("{count} visits", "{count} زيارة"),
    appointmentsCount: _m("{count} appointments", "{count} موعد"),
  }),
});
