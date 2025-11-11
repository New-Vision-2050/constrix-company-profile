import { Card, CardContent, Grid, GridProps, Skeleton } from "@mui/material";

type Props = {
  items?: number;
  spacing?: number;
  size?: GridProps["size"];
  rows?: number;
  itemContent?: React.ReactNode;
};

const defaultHeights = [50, 25, 25, 35, 20, 20, 60, 20];
const defaultWidths = [0.6, 0.4, 0.4, 0.8, 1, 1, 1, 1];

const ItemContent = ({ rows }: { rows?: number }) => (
  <>
    {Array.from({ length: rows ?? 1 }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        width={`${defaultWidths[index % defaultWidths.length] * 100}%`}
        height={defaultHeights[index % defaultHeights.length]}
        sx={{ mb: 1 }}
      />
    ))}
  </>
);

function GridCardsSkeleton({
  items = 6,
  spacing = 2,
  size = { xs: 12, sm: 6, lg: 4 },
  rows = 4,
  itemContent = null,
}: Props) {
  return (
    <Grid container spacing={spacing}>
      {Array.from({ length: items }).map((_, index) => (
        <Grid key={index} size={size}>
          <Card>
            <CardContent>
              {itemContent ? itemContent : <ItemContent rows={rows} />}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default GridCardsSkeleton;
