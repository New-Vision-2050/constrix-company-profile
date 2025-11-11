export interface BE_Media {
  id: string;
  workspaceId: string;
  model_type: string;
  model_id: string;
  collection_name: string | null;
  file_name: string;
  mime_type: string | null;
  size: number;
  original_url: string;
  created_at: string;
  updated_at: string;
}

export * from "./service";
export * from "./service-category";
