"use client";

import { BE_ServiceCategory } from "@/types/api/base/service-category";
import Grid from "@mui/material/Grid";
import { EmptyPlaceholder } from "@/components/ui/placeholders/empty";
import ServiceCategoryCard from "../category-card";
import { useTranslations } from "next-intl";

type Props = {
  categories: BE_ServiceCategory[];
  onEdit?: (category: BE_ServiceCategory) => void;
  onDelete?: (category: BE_ServiceCategory) => void;
};

function ServiceCategoriesGridUI({ categories, onEdit, onDelete }: Props) {
  const t = useTranslations("serviceCategories");

  if (categories.length === 0) {
    return (
      <EmptyPlaceholder
        title={t("emptyState")}
        subtitle={t("emptyStateDescription")}
      />
    );
  }

  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid key={category.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <ServiceCategoryCard
            category={category}
            fillHeight
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ServiceCategoriesGridUI;
