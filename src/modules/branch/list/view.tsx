"use client";
import PageContent from "@/layouts/dashboard/page-content";
import { createContextComponent } from "@/components/headless/create-context-component";
import { BranchApi } from "@/services/api/base/branch";
import { BE_ListParams } from "@/types/api/common/args/list";
import { useTranslations } from "next-intl";
import BranchesGrid from "../components/branches-grid";

type Props = {
  data: Awaited<ReturnType<typeof BranchApi.list>>["data"];
  defaultState?: BE_ListParams;
};

const ListBranchesView = createContextComponent<Props>(
  ({ data, defaultState }) => {
    const t = useTranslations("branches");

    return (
      <PageContent title={t("pluralTitle")}>
        <BranchesGrid
          initialData={data}
          defaultParams={defaultState}
          queryKey="branches-list-view"
          showTitle={false} // PageContent already has title
          enableAdd={true}
        />
      </PageContent>
    );
  }
);

export default ListBranchesView;
