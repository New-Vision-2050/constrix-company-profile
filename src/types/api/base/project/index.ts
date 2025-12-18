// Featured Project
export interface BE_FeaturedProject {
  id: string;
  name: string;
  website_project_setting_id: string;
  name_ar: string;
  name_en: string;
  description: string;
  description_ar: string;
  description_en: string;
  status: number;
  created_at: string;
  updated_at: string;
  main_image: string;
  secondary_images: string[];
}
