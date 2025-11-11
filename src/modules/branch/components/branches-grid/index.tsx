"use client";

import { useQuery } from "@tanstack/react-query";
import { BranchApi } from "@/services/api/base/branch";
import { Box, CircularProgress } from "@mui/material";
import BranchesGridWithControls from "../branches-grid-with-controls";
import { BE_ListParams } from "@/types/api/common/args/list";
import { useState } from "react";

type Props = {
  workspaceId?: string; // Optional: filter by workspace
  initialData?: Awaited<ReturnType<typeof BranchApi.list>>["data"];
  defaultParams?: BE_ListParams;
  queryKey?: string; // Custom query key prefix
  enableAdd?: boolean;
  showTitle?: boolean;
};

/**
 * Data layer - Layer 3
 * Handles data fetching, loading states, and query management
 * Passes clean data to the logic layer
 */
function BranchesGrid({
  workspaceId,
  initialData,
  defaultParams = { page: 1, perPage: 9 },
  queryKey = "branches-grid",
  enableAdd = true,
  showTitle = true,
}: Props) {
  const [page, setPage] = useState(defaultParams?.page || 1);

  const {
    data: res,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [queryKey, workspaceId, page],
    queryFn: async () => {
      const params: BE_ListParams & { workspaceId?: string } = {
        page,
        perPage: defaultParams?.perPage || 9,
      };

      if (workspaceId) {
        params.workspaceId = workspaceId;
      }

      const data = await BranchApi.list(params);
      return data.data;
    },
    placeholderData: page === defaultParams?.page ? initialData : undefined,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BranchesGridWithControls
      branches={res?.list || []}
      pagination={
        res?.metadata?.pages
          ? {
              page,
              totalPages: res.metadata.pages,
              onChange: setPage,
            }
          : undefined
      }
      enableAdd={enableAdd}
      onAddSuccess={() => refetch()}
      showTitle={showTitle}
    />
  );
}

export default BranchesGrid;
