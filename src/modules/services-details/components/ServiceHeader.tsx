import ServiceLabel from "./ServiceLabel";
import { useTranslations } from "next-intl";
import { Stack, Typography } from "@mui/material";
import PageSection from "@/layouts/main/page-section";

interface ServiceHeaderProps {
  title: string;
}

/**
 * Service Header Component
 * Displays service metadata: title
 * Supports RTL/LTR layouts and responsive design
 */
export default function ServiceHeader({
  title,
}: ServiceHeaderProps) {
  const t = useTranslations("pages.serviceDetails");

  return (
    <PageSection>
      <Stack spacing={2} alignItems="start">
        <ServiceLabel label={t("serviceName")} />
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            textAlign: { xs: "center", md: "start" },
          }}
        >
          {title}
        </Typography>
      </Stack>
    </PageSection>
  );
}

