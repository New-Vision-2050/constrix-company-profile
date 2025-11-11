import { BE_Patient } from "@/types/api/base/patient";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import {
  Calendar,
  Clock,
  Activity,
  Weight,
  Ruler,
  Drop,
} from "iconsax-reactjs";
import { useTranslations } from "next-intl";
import { CreateLocalPatientButton } from "@/modules/patient/components/create-local-patient-dialog/button";

type Props = {
  patient: BE_Patient;
};

function PatientOverviewTab({ patient }: Props) {
  const t = useTranslations("patient");
  const ct = useTranslations("common");

  // Calculate patient since date
  const patientSince = dayjs(patient.createdAt).format("YYYY-MM-DD");

  // Mock data for fields not in the model
  const mockData = {
    lastVisit: "2025-09-15",
    totalVisits: 12,
    upcomingAppointments: 2,
    bloodType: "A+",
    weight: 75,
    height: 175,
    chronicDiseases: ["Diabetes", "Hypertension"],
  };

  return (
    <Grid container spacing={4}>
      <Grid size={12}>
        <Box display="flex" justifyContent="flex-end">
          <CreateLocalPatientButton patient={patient} />
        </Box>
      </Grid>
      <Grid size={4}>
        <Card>
          <CardHeader title={ct("about")} />
          <CardContent>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Calendar />
                </ListItemIcon>
                <ListItemText
                  primary={t("overviewTab.patientSince")}
                  secondary={patientSince}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Clock />
                </ListItemIcon>
                <ListItemText
                  primary={t("overviewTab.lastVisit")}
                  secondary={mockData.lastVisit}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Activity />
                </ListItemIcon>
                <ListItemText
                  primary={t("overviewTab.totalVisits")}
                  secondary={t("overviewTab.visitsCount", {
                    count: mockData.totalVisits,
                  })}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Calendar />
                </ListItemIcon>
                <ListItemText
                  primary={t("overviewTab.upcomingAppointments")}
                  secondary={t("overviewTab.appointmentsCount", {
                    count: mockData.upcomingAppointments,
                  })}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={8}>
        <Stack spacing={3}>
          {/* Personal Information Card */}
          <Card>
            <CardHeader title={t("personalInformation")} />
            <CardContent>
              <Grid container spacing={3}>
                <Grid size={6}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      {t("form.firstName")}
                    </Typography>
                    <Typography>{patient.firstName || "-"}</Typography>
                  </Stack>
                </Grid>
                <Grid size={6}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      {t("form.lastName")}
                    </Typography>
                    <Typography>{patient.lastName || "-"}</Typography>
                  </Stack>
                </Grid>
                <Grid size={6}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      {t("form.gender")}
                    </Typography>
                    <Typography>{patient.gender || "-"}</Typography>
                  </Stack>
                </Grid>
                <Grid size={6}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      {t("form.age")}
                    </Typography>
                    <Typography>
                      {patient.age
                        ? `${patient.age} ${t("years")}`
                        : patient.dateOfBirth
                          ? dayjs(patient.dateOfBirth).format("DD MMM YYYY")
                          : "-"}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Contact Information Card */}
          <Card>
            <CardHeader title={t("contactInformation")} />
            <CardContent>
              <Grid container spacing={3}>
                <Grid size={6}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      {t("form.mobilePhone")}
                    </Typography>
                    <Typography>{patient.mobilePhone || "-"}</Typography>
                  </Stack>
                </Grid>
                <Grid size={6}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      {t("form.email")}
                    </Typography>
                    <Typography>{patient.email || "-"}</Typography>
                  </Stack>
                </Grid>
                <Grid size={12}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      {t("form.fullAddress")}
                    </Typography>
                    <Typography>
                      {patient.fullAddress ||
                        [
                          patient.street,
                          patient.building,
                          patient.city,
                          patient.country,
                        ]
                          .filter(Boolean)
                          .join(", ") ||
                        "-"}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Medical Information Card */}
          <Card>
            <CardHeader title={t("medicalInformation")} />
            <CardContent>
              <Grid container spacing={3}>
                <Grid size={4}>
                  <Stack spacing={1} alignItems="center">
                    <Drop size={32} variant="Bold" />
                    <Typography variant="caption" color="text.secondary">
                      {t("overviewTab.bloodType")}
                    </Typography>
                    <Typography variant="h6">{mockData.bloodType}</Typography>
                  </Stack>
                </Grid>
                <Grid size={4}>
                  <Stack spacing={1} alignItems="center">
                    <Weight size={32} variant="Bold" />
                    <Typography variant="caption" color="text.secondary">
                      {t("overviewTab.weight")}
                    </Typography>
                    <Typography variant="h6">
                      {mockData.weight} {t("overviewTab.kg")}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={4}>
                  <Stack spacing={1} alignItems="center">
                    <Ruler size={32} variant="Bold" />
                    <Typography variant="caption" color="text.secondary">
                      {t("overviewTab.height")}
                    </Typography>
                    <Typography variant="h6">
                      {mockData.height} {t("overviewTab.cm")}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={12}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      {t("overviewTab.chronicDiseases")}
                    </Typography>
                    <Typography>
                      {mockData.chronicDiseases.join(", ") || "-"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={12}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      {t("form.allergies")}
                    </Typography>
                    <Typography>{patient.allergies || "-"}</Typography>
                  </Stack>
                </Grid>
                <Grid size={12}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      {t("form.notes")}
                    </Typography>
                    <Typography>{patient.notes || "-"}</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default PatientOverviewTab;
