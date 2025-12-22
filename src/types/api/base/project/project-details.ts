import { BE_ProjectTranslation } from "./project-translation";

export interface BE_ProjectDetail {
    id: string;
    name: string;
    website_project_id: string;
    website_service_id: string;
    created_at: string;
    updated_at: string;
    translations: BE_ProjectTranslation[];
}