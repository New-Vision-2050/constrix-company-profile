"use client";

import { BE_ServiceWithCategory } from "@/types/api/base/service";
import Grid from "@mui/material/Grid";
import { EmptyPlaceholder } from "@/components/ui/placeholders/empty";
import ServiceCard from "../service-card";
import { useTranslations } from "next-intl";

type Props = {
  services: BE_ServiceWithCategory[];
  onEdit?: (service: BE_ServiceWithCategory) => void;
  onDelete?: (service: BE_ServiceWithCategory) => void;
};

function ServicesGridUI({ services, onEdit, onDelete }: Props) {
  const t = useTranslations("services");

  if (services.length === 0) {
    return (
      <EmptyPlaceholder
        title={t("emptyState")}
        subtitle={t("emptyStateDescription")}
      />
    );
  }

  return (
    <Grid container spacing={3}>
      {services.map((service) => (
        <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <ServiceCard
            service={service}
            fillHeight
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ServicesGridUI;
