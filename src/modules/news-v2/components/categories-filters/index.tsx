import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { ArrowRight2 } from "iconsax-reactjs";
import { useTranslations } from "next-intl";
import { NewsFilters } from "@/services/api/news";
import { BE_Category } from "@/types/api/base/categories";

type PropsT = {
  filters: NewsFilters;
  categories: BE_Category[];
  onCategoryChange: (categoryId: string | undefined) => void;
};

export default function CategoriesFilters({
  filters,
  categories,
  onCategoryChange,
}: PropsT) {
  const t = useTranslations("newsV2");

  const handleCategoryChange = (categoryId: string) => {
    if (filters?.category_website_cms_id !== categoryId)
      onCategoryChange(categoryId);
    else onCategoryChange(undefined);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        {t("categories")}
      </Typography>
      <List disablePadding>
        {categories?.map((category, index) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton
              selected={filters?.category_website_cms_id === category.id}
              onClick={() => handleCategoryChange(category.id)}
              sx={{
                borderRadius: 1,
                mb: index !== categories.length - 1 ? 0.5 : 0,
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <ArrowRight2 size={16} variant="Bold" />
              </ListItemIcon>
              <ListItemText
                primary={category.name}
                primaryTypographyProps={{
                  variant: "body2",
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
