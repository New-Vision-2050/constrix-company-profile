import { Link } from "@/i18n/navigation";
import { BE_Branch } from "@/types/api/base/branch";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Location, Call } from "iconsax-reactjs";
import { Box, Chip } from "@mui/material";

type Props = {
  branch: BE_Branch;
  fillHeight?: boolean;
};

function BranchCard({ branch, fillHeight }: Props) {
  return (
    <Card sx={{ width: 1, height: fillHeight ? 1 : undefined }}>
      <CardContent sx={{ height: fillHeight ? 1 : undefined }}>
        <Stack spacing={2} height={fillHeight ? 1 : undefined}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              variant="rounded"
              sx={{ width: 54, height: 54 }}
              src={branch.logoUrl}
              alt={branch.name}
            >
              {branch.name?.slice(0, 2).toUpperCase()}
            </Avatar>
            <Box flex={1}>
              <MuiLink
                variant="h6"
                color="text.primary"
                component={Link}
                href={`/branches/${branch.id}`}
                sx={{ display: "block", mb: 0.5 }}
              >
                {branch.name}
              </MuiLink>
              {branch.slug && (
                <Chip label={branch.slug} size="small" variant="outlined" />
              )}
            </Box>
          </Stack>

          <Stack spacing={1} flexGrow={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Location size={16} />
              <Typography variant="body2" color="text.secondary">
                {branch.address}
                {branch.city && `, ${branch.city}`}
                {branch.country && `, ${branch.country}`}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Call size={16} />
              <Typography variant="body2" color="text.secondary">
                {branch.phone}
              </Typography>
            </Stack>

            {branch.email && (
              <Typography variant="body2" color="text.secondary">
                {branch.email}
              </Typography>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default BranchCard;
