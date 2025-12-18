import PageSection from "@/layouts/main/page-section";
import { useTranslations } from "next-intl";
import ServiceLabel from "./ServiceLabel";
import PreviousWorkSlider from "./PreviousWorkSlider";
import { PreviousWork } from "../types/previous-work";

interface OurPreviousWorksProps {
  previousWorks?: PreviousWork[];
}

/**
 * Our Previous Works Component
 * Displays previous work slider if available
 * Falls back to showing label only if no works provided
 */
export default function OurPreviousWorks({ previousWorks }: OurPreviousWorksProps) {
  const t = useTranslations("pages.serviceDetails");

  return (
    <PageSection>
      {/* Label */}
      <ServiceLabel label={t("previousWord")} />

      {/* Previous Works Slider */}
      {previousWorks && previousWorks.length > 0 && (
        <PreviousWorkSlider works={previousWorks} />
      )}
    </PageSection>
  );
}
