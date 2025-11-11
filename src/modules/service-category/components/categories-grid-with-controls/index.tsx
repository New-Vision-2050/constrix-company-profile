"use client";

import { BE_ServiceCategory } from "@/types/api/base/service-category";
import { Box, Typography } from "@mui/material";
import ServiceCategoriesGridUI from "../categories-grid-ui";
import CreateServiceCategoryButton from "../create-category-dialog/button";
import { useTranslations } from "next-intl";
import CenteredPagination from "@/components/ui/others/centered-pagination";
import { useState } from "react";
import CreateServiceCategoryDialog from "../create-category-dialog";
import { ServiceCategoryApi } from "@/services/api/base/service-category";
import ConfirmDeleteDialog from "@/components/ui/interactions/confirm-delete-dialog";

type PaginationConfig = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

type Props = {
  categories: BE_ServiceCategory[];
  pagination?: PaginationConfig;
  enableAdd?: boolean;
  onAddSuccess?: () => void;
  showTitle?: boolean;
};

function ServiceCategoriesGridWithControls({
  categories,
  pagination,
  enableAdd,
  onAddSuccess,
  showTitle,
}: Props) {
  const t = useTranslations("serviceCategories");
  const [editCategory, setEditCategory] = useState<
    BE_ServiceCategory | undefined
  >(undefined);
  const [deleteCategory, setDeleteCategory] = useState<
    BE_ServiceCategory | undefined
  >(undefined);

  const handleEdit = (category: BE_ServiceCategory) => {
    setEditCategory(category);
  };

  const handleDeleteClick = (category: BE_ServiceCategory) => {
    setDeleteCategory(category);
  };

  const handleDeleteConfirm = async () => {
    if (deleteCategory) {
      await ServiceCategoryApi.delete(deleteCategory.id);
    }
  };

  return (
    <Box>
      {/* Header */}
      {(showTitle || enableAdd) && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          {showTitle && (
            <Typography variant="h5">{t("pluralTitle")}</Typography>
          )}
          {enableAdd && (
            <CreateServiceCategoryButton onSuccess={onAddSuccess} />
          )}
        </Box>
      )}

      {/* Grid */}
      <ServiceCategoriesGridUI
        categories={categories}
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
      {editCategory && (
        <CreateServiceCategoryDialog
          open={!!editCategory}
          onClose={() => setEditCategory(undefined)}
          category={editCategory}
          onSuccess={() => {
            setEditCategory(undefined);
            onAddSuccess?.();
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={!!deleteCategory}
        onClose={() => setDeleteCategory(undefined)}
        onDelete={handleDeleteConfirm}
        moduleName={t("singularTitle")}
        title={t("delete")}
        subtitle={`${t("deleteConfirm")} "${deleteCategory?.name}"`}
        onSuccess={() => {
          setDeleteCategory(undefined);
          onAddSuccess?.();
        }}
      />
    </Box>
  );
}

export default ServiceCategoriesGridWithControls;
