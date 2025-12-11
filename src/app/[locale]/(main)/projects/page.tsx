import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import ProjectsView from "@/modules/projects/view";

function ProjectsPage() {
  return (
    <MainPageContent title="Projects">
      <LayoutStack>
        <ProjectsView />
      </LayoutStack>
    </MainPageContent>
  );
}

export default ProjectsPage;
