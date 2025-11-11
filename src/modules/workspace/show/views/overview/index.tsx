import { BE_Workspace } from "@/types/api/base/workspace";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import dayjs from "dayjs";
import {
  Profile2User,
  UserOctagon,
  Clock,
  ShoppingCart,
  TickCircle,
} from "iconsax-reactjs";
import { useTranslations } from "next-intl";

type Props = {
  workspace: BE_Workspace;
};
function WorkspcaeOverviewTab({ workspace }: Props) {
  const t = useTranslations();
  return (
    <Grid container spacing={4}>
      <Grid size={4}>
        <Card>
          <CardHeader title={t("common.about")} />
          <CardContent>
            <List>
              <ListItem>
                <ListItemIcon>
                  <UserOctagon />
                </ListItemIcon>
                <ListItemText
                  primary={t("workspace.overview.adminTitle")}
                  secondary={
                    workspace.owner?.firstName + " " + workspace.owner?.lastName
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Profile2User />
                </ListItemIcon>
                <ListItemText
                  primary={t("workspace.overview.membersCount")}
                  secondary={t("workspace.overview.membersSubtitle", {
                    count: 12,
                  })}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Clock />
                </ListItemIcon>
                <ListItemText
                  primary={t("workspace.overview.createdAt")}
                  secondary={t("workspace.overview.createdAtValue", {
                    date: dayjs(workspace.createdAt).format("YYYY-MM-DD"),
                  })}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <ShoppingCart />
                </ListItemIcon>
                <ListItemText
                  primary={t("workspace.overview.currentPackage")}
                  secondary={t("workspace.overview.currentPackageValue", {
                    package: "Free",
                  })}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Clock />
                </ListItemIcon>
                <ListItemText
                  primary={t("workspace.overview.expiryDate")}
                  secondary={t("workspace.overview.expiryDateValue", {
                    date: "2026-01-01",
                  })}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <TickCircle />
                </ListItemIcon>
                <ListItemText
                  primary={t("workspace.overview.status")}
                  secondary={t("workspace.overview.statusActive")}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={8}>
        <Card>{t("common.about")}</Card>
      </Grid>
    </Grid>
  );
}

export default WorkspcaeOverviewTab;
