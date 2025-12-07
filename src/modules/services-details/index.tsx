import ServiceHeader from "./components/ServiceHeader";
import ServiceImage from "./components/ServiceImage";
import { ServiceDetail } from "./types/service-details";
import LayoutStack from "@/layouts/main/layout-stack";
import ServiceDescription from "./components/ServiceDescription";
import { useTranslations } from "next-intl";


interface ServicesDetailsModuleProps {
  serviceData: ServiceDetail;
}

/**
 * Main service details module
 * Composes all service detail components
 * Server component for optimal performance and SEO
 */
export default function ServicesDetailsView({
  serviceData,
}: ServicesDetailsModuleProps) {
  const t = useTranslations("pages.serviceDetails");

  return (
    <LayoutStack>
      {/* Service Header */}
      <ServiceHeader title={serviceData.title} />
      {/* Service Description */}
      <ServiceDescription label={t("serviceDescription")} description={serviceData.description} />
      {/* image */}
      <ServiceImage src={serviceData.imageUrl} alt={serviceData.imageAlt} />
      {/* Service Content */}
      <ServiceDescription label={t("description")} description={serviceData.content} />
    </LayoutStack>
  );
}
