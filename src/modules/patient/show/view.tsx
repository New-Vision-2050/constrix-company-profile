"use client";

import PageContent from "@/layouts/dashboard/page-content";
import { BE_Patient } from "@/types/api/base/patient";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardMedia,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  Chart2,
  Activity,
  Calendar,
  DocumentText,
  Settings,
} from "iconsax-reactjs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import PatientOverviewTab from "./views/overview";
import PatientMedicalHistoryTab from "./views/medical-history";
import PatientAppointmentsTab from "./views/appointments";
import PatientDocumentsTab from "./views/documents";
import PatientSettingsTab from "./views/settings";
import { getPatientName } from "../utils/get-patient-name";

type Props = { patient: BE_Patient };

function ShowPatientView({ patient }: Props) {
  const t = useTranslations("patient");
  const [tab, setTab] = useState("Overview");

  const renderTab = () => {
    switch (tab) {
      case "Overview":
        return <PatientOverviewTab patient={patient} />;
      case "MedicalHistory":
        return <PatientMedicalHistoryTab />;
      case "Appointments":
        return <PatientAppointmentsTab />;
      case "Documents":
        return <PatientDocumentsTab />;
      case "Settings":
        return <PatientSettingsTab />;
      default:
        return null;
    }
  };

  const patientName = getPatientName(patient);
  const initials =
    `${patient.firstName?.[0] ?? ""}${patient.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <PageContent title={t("profile")}>
      <Stack spacing={3}>
        <Card>
          <CardMedia
            image="/assets/images/cover/medical-cover.jpg"
            sx={{ height: 250, position: "relative" }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              position={"absolute"}
              bottom={-24}
              left={24}
            >
              <Avatar
                alt={patientName}
                sx={{ width: 128, height: 128, bgcolor: "primary.main" }}
              >
                <Typography variant="h3" color="common.white">
                  {initials}
                </Typography>
              </Avatar>
              <Box>
                <Typography variant="h4" color="common.white">
                  {patientName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {patient.gender || ""}{" "}
                  {patient.age ? `• ${patient.age} ${t("years")}` : ""}
                </Typography>
              </Box>
            </Stack>
          </CardMedia>
          <CardActions
            sx={{ p: 0, display: "flex", flexDirection: "row-reverse" }}
          >
            <div>
              <Tabs
                value={tab}
                onChange={(e, v) => setTab(v)}
                aria-label="patient profile tabs"
              >
                <Tab label={t("overview")} value="Overview" icon={<Chart2 />} />
                <Tab
                  label={t("medicalHistory")}
                  value="MedicalHistory"
                  icon={<Activity />}
                />
                <Tab
                  label={t("appointments")}
                  value="Appointments"
                  icon={<Calendar />}
                />
                <Tab
                  label={t("documents")}
                  value="Documents"
                  icon={<DocumentText />}
                />
                <Tab
                  label={t("settings")}
                  value="Settings"
                  icon={<Settings />}
                />
              </Tabs>
            </div>
          </CardActions>
        </Card>
        <div>{renderTab()}</div>
      </Stack>
    </PageContent>
  );
}

export default ShowPatientView;
