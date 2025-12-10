import { Box, Card, CardActionArea, Typography, alpha } from "@mui/material";
import { useTranslations } from "next-intl";

type Props = {
  title: string;
  projects: number;
};

function CategoryCard({ title, projects }: Props) {
  const t = useTranslations("about");
  return (
    <Card
      sx={{
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: (theme) => theme.shadows[10],
        },
      }}
    >
      <CardActionArea
        sx={{
          height: "100%",
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          minHeight: 120,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          {projects.toLocaleString()} {t("projects")}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
          }}
        >
          {title}
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default CategoryCard;
