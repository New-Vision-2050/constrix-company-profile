import { Box, darken, styled } from "@mui/material";

const DarkGradiantBgBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg,${darken(theme.palette.primary.dark, 0.35)} 0%, ${darken(theme.palette.primary.dark, 0.6)} 100%)`,
}));

export default DarkGradiantBgBox;
