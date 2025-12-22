export interface BE_SocialLinkType {
  id: string;
  name: string;
}

export interface BE_SocialLink {
  id: string;
  type: BE_SocialLinkType;
  link: string;
  status: number;
  icon_url: string;
  icon_name: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}
