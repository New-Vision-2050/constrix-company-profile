"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import WorkspaceCard from "../components/workspace-card";
import PageContent from "@/layouts/dashboard/page-content";
import { CreateWorkspaceButton } from "../components/create-workspace-dialog/button";
import { createContextComponent } from "@/components/headless/create-context-component";
import { useQuery } from "@tanstack/react-query";
import { WorkspaceApi } from "@/services/api/base/workspace";
import { useState } from "react";
import CenteredPagination from "@/components/ui/others/centered-pagination";
import { BE_ListParams } from "@/types/api/common/args/list";
import { useTranslations } from "next-intl";

type Props = {
  data: Awaited<ReturnType<typeof WorkspaceApi.listMine>>["data"];
  defaultState?: BE_ListParams;
};

const ListWorkspacesView = createContextComponent<Props>(
  ({ data, defaultState }) => {
    const [page, setPage] = useState(defaultState?.page || 1);
    const t = useTranslations("workspaces");
    const {
      data: res,
      refetch,
      isLoading,
    } = useQuery({
      queryKey: ["workspaces-list-view", page],
      queryFn: async () =>
        (
          await WorkspaceApi.listMine({
            page,
            perPage: defaultState?.perPage || 10,
          })
        ).data,
      refetchOnMount: false,
      placeholderData: page === defaultState?.page ? data : undefined,
    });
    return (
      <PageContent
        title={t("pluralTitle")}
        actions={<CreateWorkspaceButton onSuccess={() => refetch()} />}
        loading={isLoading}
      >
        {res?.list?.length === 0 ? (
          <Typography variant="body1">No workspaces available.</Typography>
        ) : (
          <Grid container spacing={2}>
            {res?.list?.map((workspace) => (
              <Grid
                key={workspace.id}
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 4,
                }}
              >
                <WorkspaceCard workspace={workspace} fillHeight />
              </Grid>
            ))}
          </Grid>
        )}
        <CenteredPagination
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          count={res?.metadata?.pages}
        />
      </PageContent>
    );
  }
);

export default ListWorkspacesView;
