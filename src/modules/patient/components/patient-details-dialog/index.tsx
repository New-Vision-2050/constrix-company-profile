import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CloseCircle, Edit } from "iconsax-reactjs";
import dayjs from "dayjs";
import { BE_Patient } from "@/types/api/base/patient";
import { useTranslations } from "next-intl";
import BaseDialogTitle from "@/components/shared/dialog/title";
import { getPatientName } from "../../utils/get-patient-name";

type Props = {
  open: boolean;
  onClose: () => void;
  patient: BE_Patient;
};

export default function PatientDetailsDialog({
  open,
  onClose,
  patient,
}: Props) {
  const ct = useTranslations("common");
  const t = useTranslations("patient");

  if (!patient) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <span>{t("details")}</span>
            <IconButton onClick={onClose} size="small">
              <CloseCircle size={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>{t("noData")}</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  const initials =
    `${patient.firstName?.[0] ?? ""}${patient.lastName?.[0] ?? ""}`.toUpperCase();

  const fullName = [patient.firstName, patient.middleName, patient.lastName]
    .filter(Boolean)
    .join(" ");

  const dobOrAge = patient.age
    ? `${patient.age} ${t("years")}`
    : patient.dateOfBirth
      ? dayjs(patient.dateOfBirth).format("DD MMM YYYY")
      : "-";

  const address =
    patient.fullAddress ||
    [patient.street, patient.building, patient.city, patient.country]
      .filter(Boolean)
      .join(", ") ||
    "-";

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <BaseDialogTitle title={getPatientName(patient)} />

      <DialogContent>
        <Grid container spacing={3}>
          <Grid size={6}>
            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary">
                {t("form.age")}
              </Typography>
              <Typography>{dobOrAge}</Typography>

              <Typography variant="caption" color="text.secondary">
                {t("form.gender")}
              </Typography>
              <Typography>{patient.gender ?? "-"}</Typography>

              <Typography variant="caption" color="text.secondary">
                {t("form.mobilePhone")}
              </Typography>
              <Typography>{patient.mobilePhone ?? "-"}</Typography>

              <Typography variant="caption" color="text.secondary">
                {t("form.email")}
              </Typography>
              <Typography>{patient.email ?? "-"}</Typography>
            </Stack>
          </Grid>

          <Grid size={6}>
            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary">
                {t("form.fullAddress")}
              </Typography>
              <Typography>{address}</Typography>

              <Typography variant="caption" color="text.secondary">
                {t("form.allergies")}
              </Typography>
              <Typography>{patient.allergies ?? "-"}</Typography>

              <Typography variant="caption" color="text.secondary">
                {t("form.notes")}
              </Typography>
              <Typography>{patient.notes ?? "-"}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {ct("close")}
        </Button>
        <Button variant="contained" color="primary">
          {t("viewDetails")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
