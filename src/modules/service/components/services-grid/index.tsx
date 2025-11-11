"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ServiceApi } from "@/services/api/base/service";
import { BE_ListParams } from "@/types/api/common/args/list";
import { ListServicesResponse } from "@/services/api/base/service/types/responses";
import ServicesGridWithControls from "../services-grid-with-controls";
import { CircularProgress, Box } from "@mui/material";
import { ServiceCategoryApi } from "@/services/api/base/service-category";
import { ServiceCategoryStatus } from "@/types/api/base/service-category";

type Props = {
  initialData?: ListServicesResponse;
  defaultParams?: BE_ListParams;
  queryKey?: string;
  enableAdd?: boolean;
  showTitle?: boolean;
  enableCategoryFilter?: boolean;
};

function ServicesGrid({
  initialData,
  defaultParams = { page: 1, perPage: 9 },
  queryKey = "services-grid",
  enableAdd = true,
  showTitle = true,
  enableCategoryFilter = true,
}: Props) {
  const [page, setPage] = useState(defaultParams?.page || 1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  // Fetch categories for filter
  const { data: categoriesRes } = useQuery({
    queryKey: ["service-categories-all"],
    queryFn: async () =>
      (
        await ServiceCategoryApi.list({
          page: 1,
          perPage: 100,
        })
      ).data,
    enabled: enableCategoryFilter,
  });

  const activeCategories =
    categoriesRes?.list.filter(
      (cat) => cat.status === ServiceCategoryStatus.ACTIVE
    ) || [];

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [selectedCategoryId]);

  const {
    data: res,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [queryKey, page, selectedCategoryId],
    queryFn: async () => {
      const params: BE_ListParams & { categoryId?: string } = {
        page,
        perPage: defaultParams?.perPage || 9,
      };
      if (selectedCategoryId) {
        params.categoryId = selectedCategoryId;
      }
      return (await ServiceApi.list(params)).data;
    },
    placeholderData:
      page === defaultParams?.page && !selectedCategoryId
        ? initialData
        : undefined,
  });

  if (isLoading && !res) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ServicesGridWithControls
      services={res?.list || []}
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
      categories={enableCategoryFilter ? activeCategories : []}
      selectedCategoryId={selectedCategoryId}
      onCategoryChange={setSelectedCategoryId}
    />
  );
}

export default ServicesGrid;
