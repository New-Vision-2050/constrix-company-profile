import { _m, MessagesGroup } from "../../types";

export const projectsPageMessages = new MessagesGroup({
    title: _m("Our Projects", "مشاريعنا"),
    searchPlaceholder: _m("Search projects...", "بحث في المشاريع..."),
    categories: _m("Categories", "الفئات"),
    categoryAll: _m("All", "الكل"),
    noProjectsFound: _m("No projects found", "لا يوجد مشاريع متاحة"),
    noProjectsFoundDescription: _m("There are no projects available at the moment. Check back later for updates.", "لا يوجد مشاريع متاحة في الوقت الحالي. يرجى التحقق مرة أخرى لاحقاً للتحديثات."),
    error: new MessagesGroup({
        title: _m("Error", "خطأ"),
        subtitle: _m("We encountered an error while loading the projects. Please try again.", "لقد واجهنا خطأ أثناء تحميل المشاريع. يرجى المحاولة مرة أخرى."),
    }),
});
