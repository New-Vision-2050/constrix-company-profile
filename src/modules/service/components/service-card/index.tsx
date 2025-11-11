"use client";

import {
  BE_ServiceWithCategory,
  ServiceStatus,
} from "@/types/api/base/service";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box, Chip, IconButton, Menu, MenuItem, alpha } from "@mui/material";
import { Edit2, Trash, More, Clock, PercentageSquare } from "iconsax-reactjs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useCurrentCurrency } from "@/lib/hooks/use-current-currency";

type Props = {
  service: BE_ServiceWithCategory;
  fillHeight?: boolean;
  onEdit?: (service: BE_ServiceWithCategory) => void;
  onDelete?: (service: BE_ServiceWithCategory) => void;
};

function ServiceCard({ service, fillHeight, onEdit, onDelete }: Props) {
  const t = useTranslations("services");
  const { formatPriceWithDiscount } = useCurrentCurrency();
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
    onEdit?.(service);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete?.(service);
  };

  const isInactive = service.status === ServiceStatus.INACTIVE;
  const priceInfo = formatPriceWithDiscount(service.price, service.discount);

  const formatDuration = (minutes?: number) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}m`;
    }
  };

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
          {/* Header */}
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box flex={1}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                {service.name}
              </Typography>
              <Chip
                label={service.code}
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

          {/* Category Badge */}
          {service.category && (
            <Box>
              <Chip
                label={service.category.name}
                size="small"
                sx={{
                  bgcolor: service.category.color
                    ? alpha(service.category.color, 0.12)
                    : "action.hover",
                  color: service.category.color || "text.primary",
                  border: `1px solid ${service.category.color || "transparent"}`,
                }}
              />
            </Box>
          )}

          {/* Description */}
          {service.description && (
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
              {service.description}
            </Typography>
          )}

          {/* Price & Duration */}
          <Stack spacing={1}>
            <Box>
              {priceInfo.hasDiscount ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {priceInfo.original}
                  </Typography>
                  <Typography variant="h6" color="primary.main">
                    {priceInfo.discounted}
                  </Typography>
                  <Chip
                    icon={<PercentageSquare size={14} />}
                    label={`-${service.discount}%`}
                    size="small"
                    color="error"
                    variant="outlined"
                  />
                </Stack>
              ) : (
                <Typography variant="h6" color="text.primary">
                  {priceInfo.original}
                </Typography>
              )}
            </Box>

            {service.durationMinutes && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Clock size={16} />
                <Typography variant="body2" color="text.secondary">
                  {formatDuration(service.durationMinutes)}
                </Typography>
              </Stack>
            )}
          </Stack>

          {/* Status Badge */}
          <Box>
            <Chip
              label={t(service.status)}
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

export default ServiceCard;
