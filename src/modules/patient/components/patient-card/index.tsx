import { Link } from "@/i18n/navigation";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { BE_Patient } from "@/types/api/base/patient";
import { Button, CardActionArea, CardActions } from "@mui/material";
import DialogTrigger from "@/components/headless/dialog-trigger";
import PatientDetailsDialog from "../patient-details-dialog";

type Props = {
  patient: BE_Patient;
  fillHeight?: boolean;
};

function PatientCard({ patient, fillHeight }: Props) {
  const pt = useTranslations("patient");

  const initials =
    `${patient.firstName?.[0] ?? ""}${patient.lastName?.[0] ?? ""}`.toUpperCase();

  const fullName = [patient.firstName, patient.middleName, patient.lastName]
    .filter(Boolean)
    .join(" ");

  const dobOrAge = patient.age
    ? `${patient.age} ${pt("years")}`
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
    <Card
      sx={{
        width: 1,
        height: fillHeight ? 1 : undefined,
      }}
    >
      <CardContent sx={{ height: fillHeight ? 1 : undefined }}>
        <div>
          <Stack spacing={1} height={fillHeight ? 1 : undefined}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar variant="rounded" sx={{ width: 54, height: 54 }}>
                {initials || "P"}
              </Avatar>

              <Box flex={1}>
                <MuiLink
                  variant="h6"
                  color="text.primary"
                  component={Link}
                  href={`/patient/${patient.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {fullName || patient.id}
                </MuiLink>
                <Typography variant="body2" color="text.secondary">
                  {patient.identificationType && patient.identificationNumber
                    ? `${patient.identificationType}: ${patient.identificationNumber}`
                    : ""}
                </Typography>
              </Box>

              {patient.local && (
                <Chip label={pt("local")} color="primary" size="small" />
              )}
            </Box>

            <Grid container spacing={1}>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">
                  {pt("form.age")}
                </Typography>
                <Typography>{dobOrAge}</Typography>
              </Grid>

              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">
                  {pt("form.gender")}
                </Typography>
                <Typography>{patient.gender}</Typography>
              </Grid>

              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">
                  {pt("form.mobilePhone")}
                </Typography>
                <Typography>{patient.mobilePhone ?? "-"}</Typography>
              </Grid>

              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">
                  {pt("form.email")}
                </Typography>
                <Typography>{patient.email ?? "-"}</Typography>
              </Grid>

              <Grid size={12}>
                <Typography variant="caption" color="text.secondary">
                  {pt("form.fullAddress")}
                </Typography>
                <Typography>{address}</Typography>
              </Grid>

              {patient.allergies && (
                <Grid size={12}>
                  <Typography variant="caption" color="text.secondary">
                    {pt("form.allergies")}
                  </Typography>
                  <Typography>{patient.allergies}</Typography>
                </Grid>
              )}

              {patient.notes && (
                <Grid size={12}>
                  <Typography variant="caption" color="text.secondary">
                    {pt("form.notes")}
                  </Typography>
                  <Typography noWrap>{patient.notes}</Typography>
                </Grid>
              )}
            </Grid>
          </Stack>
        </div>

        <CardActions>
          <DialogTrigger
            component={PatientDetailsDialog}
            dialogProps={{ patient }}
            render={({ onOpen }) => (
              <Button onClick={onOpen}>{pt("viewDetails")}</Button>
            )}
          />
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default PatientCard;
