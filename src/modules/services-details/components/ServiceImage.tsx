import PageSection from "@/layouts/main/page-section";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ServiceLabel from "./ServiceLabel";

interface ServiceImageProps {
  src: string;
  alt: string;
}

/**
 * Service Image Component
 * Displays the main service image with optimized loading
 * Uses Next.js Image for automatic optimization
 */
export default function ServiceImage({ src, alt }: ServiceImageProps) {
  const t = useTranslations("pages.serviceDetails");
  return (
    <PageSection>
      {/* previous word */}
      <ServiceLabel label={t("previousWord")} />

      {/* image */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%" },
          height: { xs: 250, sm: 350, md: 450 },
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>
    </PageSection>
  );
}

