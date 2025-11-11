import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
} from "@mui/material";
import { useTranslations } from "next-intl";

function PatientMedicalHistoryTab() {
  const t = useTranslations("patient");

  return (
    <Card>
      <CardHeader title={t("medicalHistory")} />
      <CardContent>
        <Stack spacing={2} alignItems="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            {t("noDataAvailable")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Medical history will be displayed here
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PatientMedicalHistoryTab;
