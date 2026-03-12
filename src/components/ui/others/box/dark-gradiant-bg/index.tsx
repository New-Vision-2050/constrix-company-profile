import { Box, darken, styled } from "@mui/material";

interface DarkGradiantBgBoxProps {
  backgroundImage?: string;
}

const DarkGradiantBgBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'backgroundImage',
})<{ backgroundImage?: string }>(({ theme, backgroundImage }) => {
  // Debug logging
  if (typeof window !== 'undefined') {
    console.log("DarkGradiantBgBox backgroundImage:", backgroundImage);
  }
  
  return {
    background: backgroundImage 
      ? `linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%), url(${backgroundImage})`
      : `linear-gradient(90deg,${darken(theme.palette.primary.dark, 0.35)} 0%, ${darken(theme.palette.primary.dark, 0.6)} 100%)`,
    backgroundSize: backgroundImage ? 'cover' : 'auto',
    backgroundPosition: backgroundImage ? 'center' : 'initial',
  };
});

export default DarkGradiantBgBox;
