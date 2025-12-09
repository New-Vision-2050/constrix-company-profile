import { BE_DefaultResponse } from "@/types/api/base/common/default-response";
import { BE_PaletteColor } from "@/types/api/base/palette";
import { BE_SocialLink } from "@/types/api/base/social-link";

export interface Background {
  paper?: string;
  default?: string;
}

export interface Common {
  black?: string;
  white?: string;
}

export interface Text {
  primary?: string;
  secondary?: string;
  disabled?: string;
  divider?: string;
}

export interface SocialMediaLinks {
  facebook?: BE_SocialLink;
  youtube?: BE_SocialLink;
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface ColorPalettes {
  background: Background;
  common: Common;
  text: Text;
  primary: BE_PaletteColor;
  secondary: BE_PaletteColor;
  error: BE_PaletteColor;
  info: BE_PaletteColor;
  warning: BE_PaletteColor;
}

export interface ThemeResponse
  extends BE_DefaultResponse<{
    id: string;
    company_id: string;
    url: string;
    radius: number;
    html_font_size: number;
    font_family: string;
    font_size: string;
    font_weight_light: string;
    font_weight_regular: string;
    font_weight_medium: string;
    font_weight_bold: string;
    status: number;
    created_at: string;
    updated_at: string;
    color_palettes: ColorPalettes;
    icon_url: string;
    contact_info: ContactInfo;
    social_media_links: SocialMediaLinks;
  }> {}
