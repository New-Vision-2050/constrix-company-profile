"use client";

import PageContent from "@/layouts/dashboard/page-content";
import { BE_Workspace } from "@/types/api/base/workspace";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardMedia,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Chart2, Profile2User, Settings, Buildings2 } from "iconsax-reactjs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import WorkspcaeOverviewTab from "./views/overview";
import WorkspaceBranchesTab from "./views/branches";

type Props = { workspace: BE_Workspace };

function ShowWorkspaceView({ workspace }: Props) {
  const t = useTranslations("workspaces");
  const [tab, setTab] = useState("Settings");

  const renderTab = () => {
    switch (tab) {
      case "Overview":
        return <WorkspcaeOverviewTab workspace={workspace} />;
      case "Settings":
        return <div>Settings</div>;
      case "Crew":
        return <div>Crew</div>;
      case "Branches":
        return <WorkspaceBranchesTab workspace={workspace} />;
      default:
        return null;
    }
  };
  return (
    <PageContent title={t("details")}>
      <Stack spacing={3}>
        <Card>
          <CardMedia
            image="/assets/images/cover/medical-cover.jpg"
            sx={{ height: 250, position: "relative" }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              position={"absolute"}
              bottom={-24}
              left={24}
            >
              <Avatar
                src={workspace.logo?.original_url}
                alt={workspace.name}
                sx={{ width: 128, height: 128 }}
              >
                <Typography variant="h3" color="text.primary">
                  {workspace.name?.slice(0, 2).toUpperCase()}
                </Typography>
              </Avatar>
              <Box>
                <Typography variant="h4" color="common.white">
                  {workspace.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {workspace.description}
                </Typography>
              </Box>
            </Stack>
          </CardMedia>
          <CardActions
            sx={{ p: 0, display: "flex", flexDirection: "row-reverse" }}
          >
            <div>
              <Tabs
                value={tab}
                onChange={(e, v) => setTab(v)}
                aria-label="workspace tabs"
              >
                <Tab label={t("overview")} value="Overview" icon={<Chart2 />} />
                <Tab
                  label={t("settings")}
                  value="Settings"
                  icon={<Settings />}
                />
                <Tab label={t("crew")} value="Crew" icon={<Profile2User />} />
                <Tab
                  label={t("branches")}
                  value="Branches"
                  icon={<Buildings2 />}
                />
              </Tabs>
            </div>
          </CardActions>
        </Card>
        <div>{renderTab()}</div>
      </Stack>
    </PageContent>
  );
}

export default ShowWorkspaceView;
