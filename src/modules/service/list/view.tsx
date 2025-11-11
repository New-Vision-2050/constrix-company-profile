"use client";

import { createContextComponent } from "@/components/headless/create-context-component";
import PageContent from "@/layouts/dashboard/page-content";
import { useTranslations } from "next-intl";
import { ListServicesResponse } from "@/services/api/base/service/types/responses";
import ServicesGrid from "../components/services-grid";

type Props = {
  data: ListServicesResponse;
};

const ListServicesView = createContextComponent<Props>(({ data }) => {
  const t = useTranslations("services");

  return (
    <PageContent title={t("pluralTitle")}>
      <ServicesGrid
        initialData={data}
        defaultParams={{ page: 1, perPage: 9 }}
      />
    </PageContent>
  );
});

export default ListServicesView;
