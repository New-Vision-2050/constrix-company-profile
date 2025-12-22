import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import ProjectsView from "@/modules/projects/view";
import { useTranslations } from "next-intl";

function ProjectsPage() {
  // get translations
  const t = useTranslations("pages.projects");

  return (
    <MainPageContent title={t("title")}>
      <LayoutStack>
        <ProjectsView />
      </LayoutStack>
    </MainPageContent>
  );
}

export default ProjectsPage;
