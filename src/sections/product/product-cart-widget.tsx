import type { BoxProps } from "@mui/material/Box";

import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";

import { RouterLink } from "@/routes/components";

import { ShoppingCart } from "iconsax-reactjs";

// ----------------------------------------------------------------------

type CartIconProps = BoxProps & {
  totalItems: number;
};

export function CartIcon({ totalItems, sx, ...other }: CartIconProps) {
  return (
    <Box
      component={RouterLink}
      href="#"
      sx={[
        (theme) => ({
          right: 0,
          top: 112,
          zIndex: 999,
          display: "flex",
          cursor: "pointer",
          position: "fixed",
          color: "text.primary",
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          bgcolor: "background.paper",
          padding: theme.spacing(1, 3, 1, 2),
          boxShadow: theme.vars.customShadows.dropdown,
          transition: theme.transitions.create(["opacity"]),
          "&:hover": { opacity: 0.72 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Badge showZero badgeContent={totalItems} color="error" max={99}>
        <ShoppingCart size={24} color="currentColor" />
      </Badge>
    </Box>
  );
}
