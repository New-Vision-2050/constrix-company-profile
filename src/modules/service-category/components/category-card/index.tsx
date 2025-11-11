"use client";

import {
  BE_ServiceCategory,
  ServiceCategoryStatus,
} from "@/types/api/base/service-category";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box, Chip, IconButton, Menu, MenuItem, alpha } from "@mui/material";
import { Category2, Edit2, Trash, More } from "iconsax-reactjs";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  category: BE_ServiceCategory;
  fillHeight?: boolean;
  onEdit?: (category: BE_ServiceCategory) => void;
  onDelete?: (category: BE_ServiceCategory) => void;
};

function ServiceCategoryCard({
  category,
  fillHeight,
  onEdit,
  onDelete,
}: Props) {
  const t = useTranslations("serviceCategories");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit?.(category);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete?.(category);
  };

  const isInactive = category.status === ServiceCategoryStatus.INACTIVE;

  return (
    <Card
      sx={{
        width: 1,
        height: fillHeight ? 1 : undefined,
        opacity: isInactive ? 0.6 : 1,
        position: "relative",
      }}
    >
      <CardContent sx={{ height: fillHeight ? 1 : undefined }}>
        <Stack spacing={2} height={fillHeight ? 1 : undefined}>
          {/* Header with color indicator and actions */}
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: 2,
                bgcolor: category.color
                  ? alpha(category.color, 0.12)
                  : "action.hover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px solid ${category.color || "transparent"}`,
              }}
            >
              <Category2
                size={28}
                color={category.color || "currentColor"}
                variant="Bulk"
              />
            </Box>

            <Box flex={1}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                {category.name}
              </Typography>
              <Chip
                label={category.code}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.75rem" }}
              />
            </Box>

            <IconButton size="small" onClick={handleMenuClick}>
              <More size={20} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleEdit}>
                <Edit2 size={16} style={{ marginRight: 8 }} />
                {t("edit")}
              </MenuItem>
              <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
                <Trash size={16} style={{ marginRight: 8 }} />
                {t("delete")}
              </MenuItem>
            </Menu>
          </Stack>

          {/* Description */}
          {category.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {category.description}
            </Typography>
          )}

          {/* Status Badge */}
          <Box>
            <Chip
              label={t(category.status)}
              size="small"
              color={isInactive ? "default" : "success"}
              variant={isInactive ? "outlined" : "filled"}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ServiceCategoryCard;
