import { _m, MessagesGroup } from "../../types";

export const newsV2Messages = new MessagesGroup({
  title: _m("News & Blog", "الأخبار والمدونة"),
  searchPlaceholder: _m("Search...", "بحث..."),
  categories: _m("Categories", "التصنيفات"),
  recentPosts: _m("Recent posts", "آخر المنشورات"),
  popularTags: _m("Popular tags", "الوسوم الشائعة"),
  advertisement: _m("Advertisement", "إعلان"),
  adDescription: _m(
    "Duis leo. Donec orci lectus, aliquam ut, faucibus non",
    "دويس ليو. دونيك أورسي ليكتوس، أليكوام أوت، فاوسيبوس نون"
  ),
  adButton: _m("Go now", "اذهب الآن"),
  noNewsFound: _m("No news found", "لا يوجد أخبار"),
  noNewsFoundDescription: _m("No news found description", "لا يوجد أخبار متوفرة"),
  error: new MessagesGroup({
    title: _m("Error", "خطأ"),
    subtitle: _m("Error subtitle", "خطأ الوصف"),
  }),
});
