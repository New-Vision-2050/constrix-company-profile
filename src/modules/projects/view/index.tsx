import PageSection from "@/layouts/main/page-section";
import ViewEntryPoint from "../components/ViewEntryPoint";
import { CategoriesApi } from "@/services/api/categories";


export default async function ProjectsView() {
    // get categories
    const categories = await CategoriesApi.projectsCategories();
    const categoriesData = categories.data.payload;
    
    return (
        <PageSection>
            <ViewEntryPoint categories={categoriesData} />
        </PageSection>
    );
}