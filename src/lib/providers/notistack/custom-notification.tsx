"use client";

import React, { forwardRef } from "react";
import { SnackbarContent } from "notistack";
import { styled, alpha } from "@mui/material/styles";
import { Box, Typography, IconButton } from "@mui/material";
import { Iconify, type IconifyName } from "@/components/iconify";
import { themeConfig } from "@/theme/theme-config";

// ----------------------------------------------------------------------

type NotificationVariant = "success" | "error" | "warning" | "info" | "default";

interface CustomNotificationProps {
  message: React.ReactNode;
  variant?: NotificationVariant;
  onClose?: () => void;
}

// ----------------------------------------------------------------------

const StyledSnackbarContent = styled(SnackbarContent, {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant?: NotificationVariant }>(({ variant = "default" }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          border: `1.5px solid ${alpha(themeConfig.palette.success.main, 0.3)}`,
          "& .notification-icon": {
            backgroundColor: themeConfig.palette.success.main,
            color: themeConfig.palette.common.white,
          },
        };
      case "error":
        return {
          border: `1.5px solid ${alpha(themeConfig.palette.error.main, 0.3)}`,
          "& .notification-icon": {
            backgroundColor: themeConfig.palette.error.main,
            color: themeConfig.palette.common.white,
          },
        };
      case "warning":
        return {
          border: `1.5px solid ${alpha(themeConfig.palette.warning.main, 0.3)}`,
          "& .notification-icon": {
            backgroundColor: themeConfig.palette.warning.main,
            color: themeConfig.palette.grey[800],
          },
        };
      case "info":
        return {
          border: `1.5px solid ${alpha(themeConfig.palette.info.main, 0.3)}`,
          "& .notification-icon": {
            backgroundColor: themeConfig.palette.info.main,
            color: themeConfig.palette.common.white,
          },
        };
      default:
        return {
          border: `1.5px solid ${alpha(themeConfig.palette.grey[400], 0.3)}`,
          "& .notification-icon": {
            backgroundColor: themeConfig.palette.grey[500],
            color: themeConfig.palette.common.white,
          },
        };
    }
  };

  return {
    backgroundColor: `${alpha(themeConfig.palette.grey[50], 0.92)}`, // Paper-like background
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    color: themeConfig.palette.grey[800],
    borderRadius: 16,
    padding: "18px 22px",
    minWidth: 360,
    maxWidth: 420,
    boxShadow: `
      0 8px 32px ${alpha(themeConfig.palette.grey[900], 0.08)},
      0 2px 8px ${alpha(themeConfig.palette.grey[900], 0.04)}
    `,
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(135deg, ${alpha(themeConfig.palette.common.white, 0.4)} 0%, ${alpha(themeConfig.palette.common.white, 0.1)} 100%)`,
      pointerEvents: "none",
    },
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `
        0 12px 40px ${alpha(themeConfig.palette.grey[900], 0.12)},
        0 4px 16px ${alpha(themeConfig.palette.grey[900], 0.06)}
      `,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    ...getVariantStyles(),
  };
});

const NotificationIcon = styled(Box)(() => ({
  width: 44,
  height: 44,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 16,
  flexShrink: 0,
  position: "relative",
  boxShadow: `0 4px 12px ${alpha(themeConfig.palette.grey[900], 0.15)}`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    background: `linear-gradient(135deg, ${alpha(themeConfig.palette.common.white, 0.2)} 0%, ${alpha(themeConfig.palette.common.white, 0.05)} 100%)`,
    pointerEvents: "none",
  },
}));

const CloseButton = styled(IconButton)(() => ({
  padding: 6,
  borderRadius: 8,
  color: alpha(themeConfig.palette.grey[600], 0.7),
  backgroundColor: alpha(themeConfig.palette.grey[100], 0.8),
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    color: themeConfig.palette.grey[800],
    backgroundColor: alpha(themeConfig.palette.grey[200], 0.9),
    transform: "scale(1.05)",
  },
}));

// ----------------------------------------------------------------------

const getIconName = (variant: NotificationVariant): IconifyName => {
  switch (variant) {
    case "success":
      return "eva:checkmark-fill";
    case "error":
      return "mingcute:close-line";
    case "warning":
      return "eva:trending-up-fill"; // Using available trending icon for warning
    case "info":
      return "eva:search-fill"; // Using available search icon for info
    default:
      return "solar:bell-bing-bold-duotone";
  }
};

// ----------------------------------------------------------------------

const CustomNotification = forwardRef<HTMLDivElement, CustomNotificationProps>(
  ({ message, variant = "default", onClose }, ref) => {
    return (
      <StyledSnackbarContent ref={ref} variant={variant}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <NotificationIcon className="notification-icon">
            <Iconify
              icon={getIconName(variant)}
              width={22}
              height={22}
              sx={{ color: "inherit", zIndex: 1 }}
            />
          </NotificationIcon>

          <Box sx={{ flex: 1, minWidth: 0, pt: 0.5 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                fontSize: "0.875rem",
                color: themeConfig.palette.grey[800],
                lineHeight: 1.6,
                wordBreak: "break-word",
                letterSpacing: "0.01em",
              }}
            >
              {message}
            </Typography>
          </Box>

          {onClose && (
            <CloseButton
              onClick={onClose}
              size="small"
              sx={{ ml: 2, mt: -0.25 }}
            >
              <Iconify icon="mingcute:close-line" width={14} height={14} />
            </CloseButton>
          )}
        </Box>
      </StyledSnackbarContent>
    );
  }
);

CustomNotification.displayName = "CustomNotification";

export default CustomNotification;
