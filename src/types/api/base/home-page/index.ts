import { BE_WebsiteIcon } from "../icon";
import { BE_FeaturedProject } from "../project";

// Home Page Setting
export interface BE_HomePageSetting {
  id: string;
  company_id: string;
  web_video_link: string;
  mobile_video_link: string;
  description: string;
  description_ar: string;
  description_en: string;
  is_companies: number;
  is_approvals: number;
  is_certificates: number;
  web_video_file: string | null;
  mobile_video_file: string | null;
  video_profile_file: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}

// Our Services Section
export interface BE_OurServices {
  id: string;
  title: string;
  description: string;
  status: number;
  company_id: string;
  created_at: string;
  updated_at: string;
  departments: [];
}

// Founder
export interface BE_Founder {
  id: string;
  name: string;
  name_ar: string;
  name_en: string;
  description: string;
  description_ar: string;
  description_en: string;
  job_title: string;
  job_title_ar: string;
  job_title_en: string;
  personal_photo: string;
}

// Home Page Data Payload
export interface BE_HomePageData {
  home_page_setting: BE_HomePageSetting;
  our_services: BE_OurServices;
  founders: BE_Founder[];
  featured_projects: BE_FeaturedProject[];
  approval_icons: BE_WebsiteIcon[];
  company_icons: BE_WebsiteIcon[];
  certificate_icons: BE_WebsiteIcon[];
  website_services: [];
}
