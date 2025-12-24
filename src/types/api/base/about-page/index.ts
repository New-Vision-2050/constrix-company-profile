import { Nullable } from "@/types/common/nullable";
import { BE_WebsiteIcon } from "../icon";

export interface AboutPagePayload {
  id: string;
  company_id: string;
  title: string;
  description: string;
  is_certificates: number;
  is_approvals: number;
  is_companies: number;
  about_me: string;
  vision: string;
  target: string;
  slogan: string;
  status: number;
  created_at: string;
  updated_at: string;
  main_image: string;
  project_types: AboutPageProjectType[];
  attachments: AboutPageAttachmentType[];
  company_icons?: AboutPageIcon[];
}

interface AboutPageIcon {
  id: string;
  name: string;
  category_type: string;
  icon_url: string;
}

export interface AboutPageProjectType {
  id: number;
  title: string;
  count: number;
}

export interface AboutPageAttachmentType {
  id: number;
  name: string;
  attachment_url: Nullable<string>;
}
