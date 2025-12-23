import MainPageContent from "@/layouts/main/page-content";
import LayoutStack from "@/layouts/main/layout-stack";
import PageSection from "@/layouts/main/page-section";
import { BE_ServicePageData } from "@/types/api/base/services";
import DepartmentSection from "./department-section";

type Props = {
  data: BE_ServicePageData;
};

export default function ServicesView({ data }: Props) {
  return (
    <MainPageContent title="Services">
      <LayoutStack>
        {data.departments?.map((department) => (
          <PageSection key={department.id}>
            <DepartmentSection department={department} />
          </PageSection>
        ))}
      </LayoutStack>
    </MainPageContent>
  );
}
