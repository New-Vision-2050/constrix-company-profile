import MainPageContent from "@/layouts/main/page-content";
import LayoutStack from "@/layouts/main/layout-stack";
import { ProjectsApi } from "@/services/api/projects";
import ProjectDetailsView from "@/modules/Project-details";

// enable dynamic params 
export const dynamicParams = true;


/**
 * Project detail page - Server component
 * Fetches data on server for better SEO and performance
 */
export default async function ProjectDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const projectRes = await ProjectsApi.show(id);
    const projectData = projectRes.data.payload;

    return (
        <MainPageContent title={projectData.name}>
            <LayoutStack>
                <ProjectDetailsView projectData={projectData} />
            </LayoutStack>
        </MainPageContent>
    );
}