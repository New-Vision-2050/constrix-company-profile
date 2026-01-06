import { BE_Service } from "../services";
import { BE_ProjectTranslation } from "./project-translation";

export interface BE_ProjectDetail {
    id: string;
    name: string;
    website_project_id: string;
    website_service_id: string;
    created_at: string;
    updated_at: string;
    website_service: BE_Service,
    translations: BE_ProjectTranslation[];
}