export interface BE_NewsItem {
  id: string;
  title: string;
  title_ar: string;
  title_en: string;
  content: string;
  content_ar: string;
  content_en: string;
  main_image?: string;
  thumbnail?: string;
  category_website_cms_id: string;
  category?: BE_NewsCategory;
  publish_date: string;
  end_date: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface BE_NewsCategory {
  id: string;
  name: string;
}
