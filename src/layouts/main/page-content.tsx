import LoadingBackdrop from "@/components/ui/interactions/loading-backdrop";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  title: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
  loading?: boolean;
}>;

function PageContent({
  title,
  actions,
  breadcrumbs,
  children,
  loading = false,
}: Props) {
  return (
    <>
      <LoadingBackdrop open={loading} />
      <Stack spacing={2}>
        <Box display="flex" gap={4}>
          <Typography variant="h4" gutterBottom flexGrow={1}>
            {title}
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            {actions}
          </Box>
        </Box>
        <Box>{breadcrumbs}</Box>
        <Box>{children}</Box>
      </Stack>
    </>
  );
}

export default PageContent;
