import { BE_Category } from "../categories";
import { BE_ProjectTranslation } from "../project/project-translation";

export interface BE_ServicePageData {
  id: string;
  title: string;
  description: string;
  status: number;
  company_id: string;
  created_at: string;
  updated_at: string;
  departments: BE_ServiceDepartment[];
}

export interface BE_ServicePageItem {
  id: string;
  name: string;
  name_ar: string;
  name_en: string;
  main_image: string;
  icon: string;
  category_website_cms_id: string;
  category: BE_ServiceItemCategory;
  reference_number: string;
  description: string;
  description_ar: string;
  description_en: string;
  previous_work: BE_ServiceItemPreviousWork[];
  company_id: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface BE_ServiceItemCategory {
  id: string;
  name: string;
  name_ar: string;
  name_en: string;
}

export interface BE_ServiceItemPreviousWork {
  id: string;
  description: string;
  image: string;
}

export interface BE_ServiceDepartment {
  id: string;
  title: string;
  title_ar: string;
  title_en: string;
  description: string;
  description_ar: string;
  description_en: string;
  type: string;
  website_services: BE_ServicePageItem[];
}

export interface BE_Service {
  id: string;
  category_website_cms_id: string;
  reference_number: string;
  company_id: string;
  status: number;
  created_at: string;
  updated_at: string;
  pivot: BE_Pivot;
  translations: BE_ProjectTranslation[];
}

export interface BE_Pivot {
  website_project_id: string;
  website_service_id: string;
  id: string;
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
  reference_number: string;
  description: string;
  description_ar: string;
  description_en: string;
  previous_work: BE_WebsiteServicePreviousWork[];
  company_id: string;
  status: number;
  created_at: string;
  updated_at: string;
}
