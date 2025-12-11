export interface BE_ProjectTranslation {
    id: number;
    locale: string;
    translatable_type: string;
    translatable_id: string;
    field: string;
    content: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}