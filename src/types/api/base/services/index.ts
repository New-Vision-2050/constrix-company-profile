import { BE_ProjectTranslation } from "../project/project-translation"

export interface BE_Service {
    id: string
    category_website_cms_id: string
    reference_number: string
    company_id: string
    status: number
    created_at: string
    updated_at: string
    pivot: BE_Pivot
    translations: BE_ProjectTranslation[]
}

export interface BE_Pivot {
    website_project_id: string
    website_service_id: string
    id: string
    created_at: string
    updated_at: string
}