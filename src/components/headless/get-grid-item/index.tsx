import { Grid, GridProps } from "@mui/material";
import { FC } from "react";

type SizeProps = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

const getGridItem = (size: SizeProps): FC<GridProps> => {
  const GridItemComponent: FC<GridProps> = (props) => (
    <Grid {...props} size={{ ...size, ...((props.size || {}) as any) }} />
  );
  GridItemComponent.displayName = "GridItemComponent";
  return GridItemComponent;
};

export default getGridItem;
