"use client";

import React from "react";
import { Box, useTheme } from "@mui/material";

export default function DividerView() {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="svg"
        width="100%"
        height="auto"
        viewBox="0 0 1920 354"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        sx={{
          display: "block",
          minHeight: { xs: "200px", md: "354px" },
        }}
      >
        <rect
          x="-49.4792"
          y="244.406"
          width="2025.79"
          height="66"
          transform="rotate(-6.92943 -49.4792 244.406)"
          fill={palette.primary.main}
        />
        <rect
          x="-50"
          y="307.406"
          width="2025.79"
          height="46.1332"
          transform="rotate(-6.92943 -50 307.406)"
          fill={palette.primary.darker}
        />
      </Box>
    </Box>
  );
}
