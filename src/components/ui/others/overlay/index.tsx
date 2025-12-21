import { Box, styled } from "@mui/material";

const BlackOverlay = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  opacity: 0.5,
  zIndex: 1,
  pointerEvents: "none",
}));

export default BlackOverlay;
