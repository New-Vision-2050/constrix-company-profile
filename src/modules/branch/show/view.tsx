"use client";

import PageContent from "@/layouts/dashboard/page-content";
import { BE_Branch } from "@/types/api/base/branch";
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
import { Chart2, Settings } from "iconsax-reactjs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import BranchOverviewTab from "./views/overview";

type Props = { branch: BE_Branch };

function ShowBranchView({ branch }: Props) {
  const t = useTranslations("branches");
  const [tab, setTab] = useState("Overview");

  const renderTab = () => {
    switch (tab) {
      case "Overview":
        return <BranchOverviewTab branch={branch} />;
      case "Settings":
        return <div>Settings</div>;
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
                src={branch.logoUrl}
                alt={branch.name}
                sx={{ width: 128, height: 128 }}
              >
                <Typography variant="h3" color="text.primary">
                  {branch.name?.slice(0, 2).toUpperCase()}
                </Typography>
              </Avatar>
              <Box>
                <Typography variant="h4" color="common.white">
                  {branch.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {branch.city}
                  {branch.country && `, ${branch.country}`}
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
                aria-label="branch tabs"
              >
                <Tab label={t("overview")} value="Overview" icon={<Chart2 />} />
                <Tab
                  label={t("settings")}
                  value="Settings"
                  icon={<Settings />}
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

export default ShowBranchView;
