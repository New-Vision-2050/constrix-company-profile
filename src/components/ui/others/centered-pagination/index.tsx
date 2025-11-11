import { Box, Pagination, PaginationProps } from "@mui/material";

export type CenteredPaginationProps = PaginationProps & {
  boxProps?: Omit<React.ComponentProps<typeof Box>, "children">;
};

function CenteredPagination({ boxProps, ...props }: CenteredPaginationProps) {
  return (
    <Box display="flex" justifyContent="center" py={2} {...boxProps}>
      <Pagination {...props} />
    </Box>
  );
}

export default CenteredPagination;
