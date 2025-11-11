"use client";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import BranchCard from "../branch-card";
import { BE_Branch } from "@/types/api/base/branch";
import { useTranslations } from "next-intl";

type Props = {
  branches: BE_Branch[];
};

/**
 * Pure UI component - Layer 1
 * Only displays a grid of branches, nothing more
 */
function BranchesGridUI({ branches }: Props) {
  const t = useTranslations("branches");

  if (branches.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        {t("noBranches")}
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {branches.map((branch) => (
        <Grid
          key={branch.id}
          size={{
            xs: 12,
            sm: 6,
            lg: 4,
          }}
        >
          <BranchCard branch={branch} fillHeight />
        </Grid>
      ))}
    </Grid>
  );
}

export default BranchesGridUI;
