"use client";

import { useState, useTransition } from "react";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { useThemeMode } from "@/lib/theme";
import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export type ThemeToggleProps = IconButtonProps & {
  size?: "small" | "medium" | "large";
};

export function ThemeToggle({ size = "medium", sx, ...other }: ThemeToggleProps) {
  const { mode, toggleTheme } = useThemeMode();
  const [isPending, startTransition] = useTransition();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    startTransition(() => {
      toggleTheme();
      setTimeout(() => setIsAnimating(false), 300);
    });
  };

  const iconSize = size === "small" ? 20 : size === "large" ? 28 : 24;

  return (
    <Tooltip title={mode === "light" ? "Dark mode" : "Light mode"}>
      <IconButton
        onClick={handleToggle}
        disabled={isPending}
        size={size}
        sx={{
          transition: "all 0.3s ease",
          ...sx,
        }}
        {...other}
      >
        <Iconify
          icon={mode === "light" ? "solar:moon-bold-duotone" : "solar:sun-bold-duotone"}
          width={iconSize}
          sx={{
            transition: "transform 0.3s ease",
            transform: isAnimating ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </IconButton>
    </Tooltip>
  );
}

