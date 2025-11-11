"use client";

import { BE_ServiceWithCategory } from "@/types/api/base/service";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import ServicesGridUI from "../services-grid-ui";
import CreateServiceButton from "../create-service-dialog/button";
import { useTranslations } from "next-intl";
import CenteredPagination from "@/components/ui/others/centered-pagination";
import { useState } from "react";
import CreateServiceDialog from "../create-service-dialog";
import { ServiceApi } from "@/services/api/base/service";
import { BE_ServiceCategory } from "@/types/api/base/service-category";
import ConfirmDeleteDialog from "@/components/ui/interactions/confirm-delete-dialog";

type PaginationConfig = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

type Props = {
  services: BE_ServiceWithCategory[];
  pagination?: PaginationConfig;
  enableAdd?: boolean;
  onAddSuccess?: () => void;
  showTitle?: boolean;
  categories?: BE_ServiceCategory[];
  selectedCategoryId?: string;
  onCategoryChange?: (categoryId: string) => void;
};

function ServicesGridWithControls({
  services,
  pagination,
  enableAdd,
  onAddSuccess,
  showTitle,
  categories = [],
  selectedCategoryId,
  onCategoryChange,
}: Props) {
  const t = useTranslations("services");
  const [editService, setEditService] = useState<
    BE_ServiceWithCategory | undefined
  >(undefined);
  const [deleteService, setDeleteService] = useState<
    BE_ServiceWithCategory | undefined
  >(undefined);

  const handleEdit = (service: BE_ServiceWithCategory) => {
    setEditService(service);
  };

  const handleDeleteClick = (service: BE_ServiceWithCategory) => {
    setDeleteService(service);
  };

  const handleDeleteConfirm = async () => {
    if (deleteService) {
      await ServiceApi.delete(deleteService.id);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        mb={3}
      >
        <Box>
          {showTitle && (
            <Typography variant="h5">{t("pluralTitle")}</Typography>
          )}
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          {/* Category Filter */}
          {categories.length > 0 && onCategoryChange && (
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>{t("filterByCategory")}</InputLabel>
              <Select
                value={selectedCategoryId || ""}
                onChange={(e) => onCategoryChange(e.target.value)}
                label={t("filterByCategory")}
              >
                <MenuItem value="">
                  <em>{t("allCategories")}</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {enableAdd && <CreateServiceButton onSuccess={onAddSuccess} />}
        </Stack>
      </Stack>

      {/* Grid */}
      <ServicesGridUI
        services={services}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Box mt={4}>
          <CenteredPagination
            page={pagination.page}
            onChange={(_e: unknown, newPage: number) =>
              pagination.onChange(newPage)
            }
            count={pagination.totalPages}
          />
        </Box>
      )}

      {/* Edit Dialog */}
      {editService && (
        <CreateServiceDialog
          open={!!editService}
          onClose={() => setEditService(undefined)}
          service={editService}
          onSuccess={() => {
            setEditService(undefined);
            onAddSuccess?.();
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={!!deleteService}
        onClose={() => setDeleteService(undefined)}
        onDelete={handleDeleteConfirm}
        moduleName={t("singularTitle")}
        title={t("delete")}
        subtitle={`${t("deleteConfirm")} "${deleteService?.name}"`}
        onSuccess={() => {
          setDeleteService(undefined);
          onAddSuccess?.();
        }}
      />
    </Box>
  );
}

export default ServicesGridWithControls;
