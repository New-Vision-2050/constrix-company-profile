"use client";

import { Box, Typography } from "@mui/material";
import BranchesGridUI from "../branches-grid-ui";
import { CreateBranchButton } from "../create-branch-dialog/button";
import CenteredPagination from "@/components/ui/others/centered-pagination";
import { BE_Branch } from "@/types/api/base/branch";
import { useTranslations } from "next-intl";

type PaginationConfig = {
  page: number;
  totalPages: number;
  onChange: (newPage: number) => void;
};

type Props = {
  branches: BE_Branch[];
  pagination?: PaginationConfig;
  enableAdd?: boolean;
  onAddSuccess?: () => void;
  showTitle?: boolean;
};

/**
 * Logic layer - Layer 2
 * Handles pagination, add button, and title
 * Composes the UI layer with interaction logic
 */
function BranchesGridWithControls({
  branches,
  pagination,
  enableAdd = false,
  onAddSuccess,
  showTitle = false,
}: Props) {
  const t = useTranslations("branches");

  return (
    <Box>
      {/* Header with title and add button */}
      {(showTitle || enableAdd) && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          {showTitle && (
            <Typography variant="h6">{t("pluralTitle")}</Typography>
          )}
          {enableAdd && <CreateBranchButton onSuccess={onAddSuccess} />}
        </Box>
      )}

      {/* Main content - just the grid */}
      <BranchesGridUI branches={branches} />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Box mt={3}>
          <CenteredPagination
            page={pagination.page}
            onChange={(_, newPage) => pagination.onChange(newPage)}
            count={pagination.totalPages}
          />
        </Box>
      )}
    </Box>
  );
}

export default BranchesGridWithControls;
