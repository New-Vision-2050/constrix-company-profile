"use client";

import {
  Box,
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
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  count?: number;
}

interface CategoriesProps {
  categories: Category[];
  onCategoryChange?: (categoryId: string | null) => void;
}

function Categories({ categories, onCategoryChange }: CategoriesProps) {
  const t = useTranslations("newsV2");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newCategory);
    onCategoryChange?.(newCategory);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        {t("categories")}
      </Typography>
      <List disablePadding>
        {categories.map((category, index) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton
              selected={selectedCategory === category.id}
              onClick={() => handleCategoryClick(category.id)}
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
              {category.count !== undefined && (
                <Box
                  sx={{
                    bgcolor: "primary.lighter",
                    color: "primary.main",
                    px: 1,
                    py: 0.25,
                    borderRadius: 1,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {category.count}
                </Box>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Categories;
