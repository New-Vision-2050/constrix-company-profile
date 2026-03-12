import { Box, darken, styled } from "@mui/material";

interface DarkGradiantBgBoxProps {
  backgroundImage?: string;
}

const DarkGradiantBgBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'backgroundImage',
})<{ backgroundImage?: string }>(({ theme, backgroundImage }) => ({
  background: backgroundImage 
    ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`
    : `linear-gradient(90deg,${darken(theme.palette.primary.dark, 0.35)} 0%, ${darken(theme.palette.primary.dark, 0.6)} 100%)`,
  backgroundSize: backgroundImage ? 'cover' : 'auto',
  backgroundPosition: backgroundImage ? 'center' : 'initial',
  backgroundRepeat: backgroundImage ? 'no-repeat' : 'repeat',
}));

export default DarkGradiantBgBox;
