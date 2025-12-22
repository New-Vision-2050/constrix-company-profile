export interface BE_CategoryType {
  id: string;
  name: string;
}

export interface BE_Category {
  id: string;
  name: string;
  name_ar: string;
  name_en: string;
  category_type: BE_CategoryType;
  company_id: string;
  created_at: string;
  updated_at: string;
}

