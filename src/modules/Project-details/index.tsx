import PageSection from "@/layouts/main/page-section"
import { BE_FeaturedProject } from "@/types/api/base/project"
import ProjectImagesCarousel from "./components/ProjectImagesCarousel"
import ProjectDescriptionSection from "./components/ProjectDescriptionSection"


type PropsT = {
    projectData: BE_FeaturedProject
}

export default function ProjectDetailsView({ projectData }: PropsT) {
    return (
        <PageSection>
            {/* project images swiper */}
            <ProjectImagesCarousel projectData={projectData} />
            {/* description */}
            <ProjectDescriptionSection description={projectData?.description} />
        </PageSection>
    )
}