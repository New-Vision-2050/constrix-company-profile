import { Stack, Typography } from "@mui/material";
import ServiceLabel from "./ServiceLabel";
import PageSection from "@/layouts/main/page-section";

interface ServiceDescriptionProps {
  label:string;
  description: string;
}

/**
 * Service Description Component
 * Displays the main service detailed content
 * Handles proper text formatting and RTL/LTR layout
 */
export default function ServiceDescription({ label,description }: ServiceDescriptionProps) {
  return (
    <PageSection>
      <Stack spacing={2} alignItems="start">
        {/* Content Label */}
        <ServiceLabel label={label} />

        {/* Content text */}
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            lineHeight: 1.8,
          }}
        >
          {description}
        </Typography>
      </Stack>
    </PageSection>
  );
}

