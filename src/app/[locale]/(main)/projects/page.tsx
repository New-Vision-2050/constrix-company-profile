import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import ProjectsView from "@/modules/projects/view";

function ProjectsPage() {
  return (
    <MainPageContent title="Projects">
      <LayoutStack>
        <ProjectsView data={[]} pagination={{ last_page: 1, page: 1 }} handlePageChange={() => {}} />
      </LayoutStack>
    </MainPageContent>
  );
}

export default ProjectsPage;
