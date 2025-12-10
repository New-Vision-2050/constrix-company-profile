import { Card, darken, styled } from "@mui/material";

const DarkGradiantBgCard: typeof Card = styled(Card)(({ theme }) => ({
  background: `linear-gradient(90deg,${darken(theme.palette.primary.dark, 0.35)} 0%, ${darken(theme.palette.primary.dark, 0.6)} 100%)`,
})) as any;

export default DarkGradiantBgCard;
