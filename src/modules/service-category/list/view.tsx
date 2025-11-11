"use client";

import { createContextComponent } from "@/components/headless/create-context-component";
import PageContent from "@/layouts/dashboard/page-content";
import { useTranslations } from "next-intl";
import { ListServiceCategoriesResponse } from "@/services/api/base/service-category/types/responses";
import ServiceCategoriesGrid from "../components/categories-grid";

type Props = {
  data: ListServiceCategoriesResponse;
};

const ListServiceCategoriesView = createContextComponent<Props>(({ data }) => {
  const t = useTranslations("serviceCategories");

  return (
    <PageContent title={t("pluralTitle")}>
      <ServiceCategoriesGrid
        initialData={data}
        defaultParams={{ page: 1, perPage: 9 }}
      />
    </PageContent>
  );
});

export default ListServiceCategoriesView;
