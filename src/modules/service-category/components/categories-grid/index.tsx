"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ServiceCategoryApi } from "@/services/api/base/service-category";
import { BE_ListParams } from "@/types/api/common/args/list";
import { ListServiceCategoriesResponse } from "@/services/api/base/service-category/types/responses";
import ServiceCategoriesGridWithControls from "../categories-grid-with-controls";
import { CircularProgress, Box } from "@mui/material";

type Props = {
  initialData?: ListServiceCategoriesResponse;
  defaultParams?: BE_ListParams;
  queryKey?: string;
  enableAdd?: boolean;
  showTitle?: boolean;
};

function ServiceCategoriesGrid({
  initialData,
  defaultParams = { page: 1, perPage: 9 },
  queryKey = "service-categories-grid",
  enableAdd = true,
  showTitle = true,
}: Props) {
  const [page, setPage] = useState(defaultParams?.page || 1);

  const {
    data: res,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [queryKey, page],
    queryFn: async () => {
      const params: BE_ListParams = {
        page,
        perPage: defaultParams?.perPage || 9,
      };
      return (await ServiceCategoryApi.list(params)).data;
    },
    placeholderData: page === defaultParams?.page ? initialData : undefined,
  });

  if (isLoading && !res) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ServiceCategoriesGridWithControls
      categories={res?.list || []}
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

export default ServiceCategoriesGrid;
