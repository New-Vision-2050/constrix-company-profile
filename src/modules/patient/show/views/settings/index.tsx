import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
} from "@mui/material";
import { useTranslations } from "next-intl";

function PatientSettingsTab() {
  const t = useTranslations("patient");

  return (
    <Card>
      <CardHeader title={t("settings")} />
      <CardContent>
        <Stack spacing={2} alignItems="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            {t("noDataAvailable")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Patient settings will be displayed here
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PatientSettingsTab;
