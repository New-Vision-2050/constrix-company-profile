import { Link } from "@/i18n/navigation";
import { BE_Workspace } from "@/types/api/base/workspace";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

type Props = {
  workspace: BE_Workspace;
  fillHeight?: boolean;
};
function WorkspaceCard({ workspace, fillHeight }: Props) {
  const t = useTranslations("common");
  return (
    <Card sx={{ width: 1, height: fillHeight ? 1 : undefined }}>
      <CardContent sx={{ height: fillHeight ? 1 : undefined }}>
        <Stack spacing={1} height={fillHeight ? 1 : undefined}>
          <Avatar
            variant="rounded"
            sx={{ width: 54, height: 54 }}
            src={workspace.logo?.original_url}
            alt={workspace.name}
          >
            {workspace.name?.slice(0, 2).toUpperCase()}
          </Avatar>
          <MuiLink
            variant="h6"
            color="text.primary"
            component={Link}
            href={`/workspace/${workspace.id}`}
          >
            {workspace.name}
          </MuiLink>
          <Typography variant="subtitle2" color="text.secondary" flexGrow={1}>
            {workspace.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("createdAt")}{" "}
            <span lang="en" dir="ltr">
              {dayjs(workspace.createdAt).format("DD MMM YYYY")}
            </span>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default WorkspaceCard;
