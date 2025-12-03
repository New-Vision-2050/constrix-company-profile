import { Typography } from "@mui/material";

interface NewsTitleProps {
  title: string;
}

/**
 * Displays the main news title
 * Separated for single responsibility principle
 */
export default function NewsTitle({ title }: NewsTitleProps) {
  return (
    <Typography
      variant="h3"
      component="h1"
      fontWeight={700}
    >
      {title}
    </Typography>
  );
}


