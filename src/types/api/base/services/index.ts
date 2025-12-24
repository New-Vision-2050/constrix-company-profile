import { BE_Category } from "../categories";

export interface BE_Service {
  id: string;
  category_website_cms_id: string;
  reference_number: string;
  company_id: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface BE_WebsiteServicePreviousWork {
  id: string;
  description: string;
  image: string;
}

export interface BE_WebsiteService {
  id: string;
  name: string;
  name_ar: string;
  name_en: string;
  main_image: string;
  icon: string;
  category_website_cms_id: string;
  category: BE_Category;
  reference_number: string | null;
  description: string;
  description_ar: string;
  description_en: string;
  previous_work: BE_WebsiteServicePreviousWork[];
  company_id: string;
  status: number;
  created_at: string;
  updated_at: string;
}
