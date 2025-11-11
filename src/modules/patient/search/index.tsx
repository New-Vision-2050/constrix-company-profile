"use client";

import PageContent from "@/layouts/dashboard/page-content";
import { useTranslations } from "next-intl";
import { CreateGlobalPatientButton } from "../components/create-global-patient-dialog/button";
import { Box, Grid, InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PatientApi } from "@/services/api/base/patient";
import PatientCard from "../components/patient-card";
import PatientDetailsDialog from "../components/patient-details-dialog";
import { useDebounce } from "minimal-shared/hooks";
import GridCardsSkeleton from "@/components/ui/interactions/grid-cards-skeleton";
import { DEBOUNCE_TIMING } from "@/config/debounce";
import { UserSearch } from "iconsax-reactjs";
import EmptyPlaceholder from "@/components/ui/placeholders/empty";
import { useQueryState, parseAsString } from "nuqs";
import { BE_Patient } from "@/types/api/base/patient";

function SearchPatientsView() {
  const t = useTranslations("patient");

  const [searchValue, setSearch] = useQueryState("query", parseAsString),
    search = searchValue || "";
  const [createdPatient, setCreatedPatient] = useState<BE_Patient | null>(null),
    [createdPatientDialogOpen, setCreatedPatientDialogOpen] = useState(false);

  const debouncedSearch = useDebounce(search || "", DEBOUNCE_TIMING.DEFAULT);

  const patientsQuery = useQuery({
    queryKey: ["SearchPatientsView", "patients-search", debouncedSearch],
    queryFn: async () => {
      const res = await PatientApi.global.search({ query: debouncedSearch });
      return res.data;
    },
    enabled: debouncedSearch.length >= 1,
  });

  return (
    <>
      <PageContent
        title={t("plural")}
        actions={
          <CreateGlobalPatientButton
            onSuccess={(patient) => {
              setCreatedPatient(patient);
              setCreatedPatientDialogOpen(true);
            }}
          />
        }
      >
        <Stack spacing={2}>
          <Box>
            <TextField
              label={t("searchPatients")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              placeholder={t("searchPlaceholder")}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <UserSearch />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          {patientsQuery.isLoading && <GridCardsSkeleton rows={7} />}
          {patientsQuery.data &&
            (patientsQuery.data.patients.length > 0 ? (
              <Grid container spacing={2}>
                {patientsQuery.data?.patients.map((patient) => (
                  <Grid
                    key={patient.id}
                    size={{
                      xs: 12,
                      sm: 6,
                      lg: 4,
                    }}
                  >
                    <PatientCard patient={patient} fillHeight />
                  </Grid>
                ))}
              </Grid>
            ) : (
              debouncedSearch.length >= 1 && <EmptyPlaceholder />
            ))}
        </Stack>
      </PageContent>
      {createdPatient && (
        <PatientDetailsDialog
          patient={createdPatient}
          open={createdPatientDialogOpen}
          onClose={() => setCreatedPatientDialogOpen(false)}
        />
      )}
    </>
  );
}

export default SearchPatientsView;
