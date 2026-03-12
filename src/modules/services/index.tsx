import MainPageContent from "@/layouts/main/page-content";
import LayoutStack from "@/layouts/main/layout-stack";
import PageSection from "@/layouts/main/page-section";
import { BE_ServicePageData } from "@/types/api/base/services";
import DepartmentSection from "./department-section";
import { useTranslations } from "next-intl";

type Props = {
  data: BE_ServicePageData;
};

export default function ServicesView({ data }: Props) {
  const t = useTranslations("pages.services");

  // Get the first service's main image for the header background
  // Try multiple fallbacks to find an image
  const firstServiceImage = 
    data.departments?.[0]?.website_services?.[0]?.main_image ||
    data.departments?.[0]?.website_services?.[1]?.main_image ||
    data.departments?.[1]?.website_services?.[0]?.main_image ||
    // Search all departments for first service with main_image
    data.departments?.find(dept => 
      dept.website_services?.some(service => service.main_image)
    )?.website_services?.find(service => service.main_image)?.main_image;
  
  // Debug logging
  console.log("Services data:", data);
  console.log("First department:", data.departments?.[0]);
  console.log("First service:", data.departments?.[0]?.website_services?.[0]);
  console.log("First service image:", firstServiceImage);

  return (
    <MainPageContent 
      title={data.title} 
      description={data.description}
      backgroundImage={firstServiceImage}
    >
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
