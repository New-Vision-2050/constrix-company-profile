import PageSection from "@/layouts/main/page-section";
import { AboutPagePayload } from "@/types/api/base/about-page";
import { Paper, Stack, Typography } from "@mui/material";

export default function DescriptionSection({
  data,
}: {
  data: AboutPagePayload;
}) {
  return (
    <Paper sx={{ py: 4, width: 1 }}>
      <PageSection maxWidth="md">
        <Stack spacing={4} alignItems="center" mb={4}>
          <Typography variant="h4" gutterBottom textAlign="center">
            {data.title}
          </Typography>
          <Typography variant="body2" textAlign="center">
            {data.description}
          </Typography>
        </Stack>
      </PageSection>
    </Paper>
  );
}
